import { useEffect, useRef, useState } from "react";
import {
  Call,
  CallingState,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import type { VocabularyItem, PhraseItem } from "@/types/learning";
import { getApiBase } from "@/lib/stream";

export type AudioCallStatus =
  | "idle"
  | "connecting"
  | "joined"
  | "reconnecting"
  | "error"
  | "ended";

export type AgentStatus = "idle" | "connecting" | "connected" | "failed";

export interface LessonContext {
  language: string;
  lessonTitle: string;
  goal: string;
  aiTeacherPrompt: string;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
}

interface UseAudioCallReturn {
  call: Call | null;
  status: AudioCallStatus;
  agentStatus: AgentStatus;
  isMuted: boolean;
  error: string | null;
  agentCaption: string;
  userCaption: string;
  enableMic: () => Promise<void>;
  disableMic: () => Promise<void>;
  interruptAgent: () => Promise<void>;
  endCall: () => Promise<void>;
}

/** Call type required for audio_room lessons — agent needs go_live + admin role. */
const CALL_TYPE = "audio_room";
const AGENT_USER_ID = "ai-teacher";

async function startAgentSession(callId: string): Promise<string | null> {
  try {
    const res = await fetch(`${getApiBase()}/api/agent/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callType: CALL_TYPE, callId }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { sessionId?: string };
    return data.sessionId ?? null;
  } catch {
    return null;
  }
}

async function stopAgentSession(callId: string, sessionId: string): Promise<void> {
  try {
    await fetch(`${getApiBase()}/api/agent/stop`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callId, sessionId }),
    });
  } catch {
    // best-effort cleanup
  }
}

/**
 * Manages the full lifecycle of a Stream audio_room call for a lesson screen.
 *
 * - Joins the call immediately on mount with call type "audio_room".
 * - Writes lesson context (vocabulary, phrases, goal, AI prompt) into the
 *   call's custom data so the Vision Agent can read it on join.
 * - Starts the Vision Agent via the server-side proxy after joining.
 * - Watches participants to detect when the agent actually joins the call.
 * - Stops the agent session both when endCall() is called and on unmount.
 */
export function useAudioCall(
  callId: string | null,
  context: LessonContext | null
): UseAudioCallReturn {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [status, setStatus] = useState<AudioCallStatus>("idle");
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentCaption, setAgentCaption] = useState("");
  const [userCaption, setUserCaption] = useState("");

  const callRef = useRef<Call | null>(null);
  const agentSessionIdRef = useRef<string | null>(null);
  const agentClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Prevents race where agent starts after cleanup has already run.
  const cleanedUpRef = useRef(false);
  // Use a ref so the join callback always sees the latest context without
  // needing context in the effect deps (would cause unnecessary re-joins).
  const contextRef = useRef<LessonContext | null>(context);
  contextRef.current = context;

  useEffect(() => {
    if (!client || !callId) return;

    setStatus("connecting");
    setAgentStatus("idle");
    setError(null);
    cleanedUpRef.current = false;

    const c = client.call(CALL_TYPE, callId, { reuseInstance: true });
    callRef.current = c;
    setCall(c);

    // React to calling-state changes.
    const stateSub = c.state.callingState$.subscribe((state) => {
      switch (state) {
        case CallingState.JOINING:
          setStatus("connecting");
          break;
        case CallingState.JOINED:
          setStatus("joined");
          break;
        case CallingState.RECONNECTING:
          setStatus("reconnecting");
          break;
        case CallingState.LEFT:
        case CallingState.IDLE:
          setStatus("ended");
          break;
        default:
          break;
      }
    });

    // React to microphone state.
    const micSub = c.microphone.state.status$.subscribe((micState) => {
      setIsMuted(micState === "disabled");
    });

    // Detect when the AI teacher participant joins the call.
    const participantSub = c.state.participants$.subscribe((participants) => {
      const agentPresent = participants.some((p) => p.userId === AGENT_USER_ID);
      if (agentPresent) {
        setAgentStatus("connected");
      }
    });

    // Receive real-time transcript events from the agent so we can display
    // live captions for both the teacher's speech and the student's speech.
    const captionUnsub = c.on("custom", (event) => {
      const data = (event as { custom?: Record<string, unknown> }).custom;
      if (!data) return;
      const { type, speaker, text } = data as {
        type?: string;
        speaker?: string;
        text?: string;
      };
      const caption = text ?? "";

      if (type === "transcript_partial") {
        if (speaker === "agent") {
          if (agentClearTimerRef.current) clearTimeout(agentClearTimerRef.current);
          setAgentCaption(caption);
        } else if (speaker === "user") {
          if (userClearTimerRef.current) clearTimeout(userClearTimerRef.current);
          setUserCaption(caption);
        }
      } else if (type === "transcript_final") {
        if (speaker === "agent") {
          setAgentCaption(caption);
          if (agentClearTimerRef.current) clearTimeout(agentClearTimerRef.current);
          agentClearTimerRef.current = setTimeout(() => setAgentCaption(""), 2500);
        } else if (speaker === "user") {
          setUserCaption(caption);
          if (userClearTimerRef.current) clearTimeout(userClearTimerRef.current);
          userClearTimerRef.current = setTimeout(() => setUserCaption(""), 2500);
        }
      }
    });

    c.join({ create: true })
      .then(async () => {
        if (cleanedUpRef.current) return;

        // Start muted — student uses push-to-talk, so the AI never picks up its
        // own audio from the speaker and echoes back into the conversation.
        try {
          await c.microphone.disable();
        } catch {}

        // Pack lesson context into the call's custom data so the agent reads it
        // when it joins. This runs before we start the agent session.
        const ctx = contextRef.current;
        if (ctx) {
          try {
            await c.update({
              custom: {
                language: ctx.language,
                lesson_title: ctx.lessonTitle,
                lesson_goal: ctx.goal,
                system_prompt: ctx.aiTeacherPrompt,
                intro_message: `Welcome! Today we're learning ${ctx.lessonTitle}. Our goal: ${ctx.goal}`,
                vocabulary: ctx.vocabulary,
                phrases: ctx.phrases,
              },
            });
          } catch (e) {
            console.warn("[useAudioCall] call.update custom data failed", e);
          }
        }

        if (cleanedUpRef.current) return;

        // Start the Vision Agent via our server-side proxy.
        setAgentStatus("connecting");
        const sessionId = await startAgentSession(callId);

        if (cleanedUpRef.current) {
          // Cleanup ran while we were waiting — stop the session immediately.
          if (sessionId) {
            stopAgentSession(callId, sessionId).catch(() => {});
          }
          return;
        }

        if (sessionId) {
          agentSessionIdRef.current = sessionId;
        } else {
          setAgentStatus("failed");
        }
      })
      .catch((err: Error) => {
        console.error("[useAudioCall] join failed", err);
        setError(err?.message ?? "Failed to join the call");
        setStatus("error");
        setAgentStatus("failed");
      });

    return () => {
      cleanedUpRef.current = true;
      stateSub.unsubscribe();
      micSub.unsubscribe();
      participantSub.unsubscribe();
      captionUnsub();

      if (agentClearTimerRef.current) clearTimeout(agentClearTimerRef.current);
      if (userClearTimerRef.current) clearTimeout(userClearTimerRef.current);

      // Stop agent session (best-effort — do not await in cleanup).
      const sessionId = agentSessionIdRef.current;
      if (sessionId) {
        stopAgentSession(callId, sessionId).catch(() => {});
        agentSessionIdRef.current = null;
      }

      const current = callRef.current;
      if (current && current.state.callingState !== CallingState.LEFT) {
        current.leave().catch((e: Error) =>
          console.error("[useAudioCall] leave error", e)
        );
      }
      callRef.current = null;
      setCall(null);
      setStatus("ended");
      setAgentStatus("idle");
    };
  }, [client, callId]);

  const enableMic = async () => {
    const current = callRef.current;
    if (!current) return;
    try {
      await current.microphone.enable();
    } catch (err) {
      console.error("[useAudioCall] enableMic error", err);
    }
  };

  const disableMic = async () => {
    const current = callRef.current;
    if (!current) return;
    try {
      await current.microphone.disable();
    } catch (err) {
      console.error("[useAudioCall] disableMic error", err);
    }
  };

  // Sends a custom event to the call so the Python agent can cancel its current
  // response immediately, before VAD detects the student's voice.
  const interruptAgent = async () => {
    const current = callRef.current;
    if (!current) return;
    try {
      await current.sendCustomEvent({ type: "ptt_interrupt" });
    } catch {
      // best-effort; VAD will still interrupt when student starts speaking
    }
  };

  const endCall = async () => {
    const current = callRef.current;

    // Stop the agent before leaving so it doesn't linger on the call.
    const sessionId = agentSessionIdRef.current;
    if (sessionId && callId) {
      agentSessionIdRef.current = null;
      await stopAgentSession(callId, sessionId).catch(() => {});
    }
    cleanedUpRef.current = true;
    setAgentStatus("idle");

    if (!current) return;
    try {
      if (current.state.callingState !== CallingState.LEFT) {
        await current.leave();
      }
    } catch (err) {
      console.error("[useAudioCall] endCall error", err);
    }
    setStatus("ended");
  };

  return { call, status, agentStatus, isMuted, error, agentCaption, userCaption, enableMic, disableMic, interruptAgent, endCall };
}
