"""
AI Language Teacher - voice-only agent using OpenAI Realtime + Stream Edge.

The agent always speaks English and teaches the language chosen by the student.
Lesson context (language, vocabulary, system prompt, intro message) is read from
the call's custom data that the mobile app writes before the agent joins.

Environment (loaded in order — local .env overrides parent):
  STREAM_API_KEY      - reused from the parent repo .env
  STREAM_API_SECRET   - reused from the parent repo .env
  OPENAI_API_KEY      - added in vision-agent/.env
"""

import asyncio
import os
from typing import Optional

from dotenv import load_dotenv

# Load Stream keys from the parent repo .env first.
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
# Local .env adds OPENAI_API_KEY and can override any key.
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"), override=True)

from getstream.models import MemberRequest  # noqa: E402
from openai.types.realtime.realtime_transcription_session_audio_input_turn_detection_param import (  # noqa: E402
    ServerVad,
)
from vision_agents.core import Agent, AgentLauncher, Runner, User  # noqa: E402
from vision_agents.core.instructions import Instructions  # noqa: E402
from vision_agents.core.llm.realtime import (  # noqa: E402
    RealtimeAgentTranscript,
    RealtimeUserTranscript,
)
from vision_agents.plugins import getstream, openai  # noqa: E402

AGENT_USER_ID = "ai-teacher"

LANGUAGE_NAMES: dict[str, str] = {
    "es": "Spanish",
    "fr": "French",
    "ja": "Japanese",
    "de": "German",
    "it": "Italian",
    "pt": "Portuguese",
    "zh": "Chinese",
    "ko": "Korean",
    "ar": "Arabic",
    "ru": "Russian",
}

DEFAULT_SYSTEM_PROMPT = (
    "You are a warm, energetic language teacher having a real voice conversation with a student. "
    "You teach in English and introduce target-language words one at a time — say the word clearly, "
    "give its English meaning, add one simple pronunciation tip, then ask the student to try saying it. "
    "Keep every reply to one or two short, natural sentences. Use contractions and a friendly tone — "
    "'Let's try this one!', 'You've got it!', 'Almost — give it another go!'. "
    "After every word or phrase you introduce, ask the student a single question to invite them to respond, "
    "then stop and wait for their reply. "
    "When the student speaks, listen carefully to what they actually said and react to that specifically — "
    "if they got it right, give a warm one-sentence reaction and move to the next word; "
    "if they struggled, encourage them briefly and ask them to try once more. "
    "Never imagine or role-play what the student said. "
    "Never teach words or phrases outside the current lesson's vocabulary. "
    "Never switch topics or introduce another language into the lesson. "
    "Stay patient, stay positive, and keep the pace comfortable for a beginner."
)


def _require_env(var_name: str) -> None:
    if not os.getenv(var_name):
        raise RuntimeError(f"Missing required environment variable: {var_name}")


def _language_name_from_call_id(call_id: str) -> Optional[str]:
    """Derive language name from call_id format: lesson-{langCode}-..."""
    parts = call_id.split("-")
    if len(parts) >= 2 and parts[0] == "lesson":
        return LANGUAGE_NAMES.get(parts[1])
    return None


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        llm=openai.Realtime(
            # server_vad fires on raw audio energy so the agent stops speaking
            # almost immediately when the user presses the push-to-talk button,
            # before they have said a word — crucial for low-latency push-to-talk UX.
            realtime_session={
                "type": "realtime",
                "audio": {
                    "input": {
                        "transcription": {"model": "gpt-4o-mini-transcribe"},
                        "turn_detection": ServerVad(
                            type="server_vad",
                            # Lower threshold so even quiet ambient audio
                            # triggers the interrupt quickly after PTT press.
                            threshold=0.25,
                            # Short prefix so interrupt fires within ~50 ms of
                            # the first sound — feels near-instant to student.
                            prefix_padding_ms=50,
                            silence_duration_ms=400,
                            interrupt_response=True,
                        ),
                    }
                },
            }
        ),
        agent_user=User(name="AI Teacher", id=AGENT_USER_ID),
        instructions=DEFAULT_SYSTEM_PROMPT,
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    # Read lesson context packed into the call's custom data by the mobile app.
    custom: dict = {}
    try:
        resp = await call.get()
        custom = resp.data.call.custom or {}
    except Exception as e:
        print(f"[agent] Warning: could not fetch call custom data: {e}")

    system_prompt = custom.get("system_prompt") or DEFAULT_SYSTEM_PROMPT
    intro_message = custom.get("intro_message")
    language_code = custom.get("language") or ""
    lesson_title = custom.get("lesson_title") or ""
    lesson_goal = custom.get("lesson_goal") or ""
    vocabulary: list[dict] = custom.get("vocabulary") or []
    phrases: list[dict] = custom.get("phrases") or []
    language_name = (
        LANGUAGE_NAMES.get(language_code)
        or _language_name_from_call_id(call_id)
        or "language"
    )

    # Enrich the system prompt with lesson-specific vocabulary and phrases so
    # the agent stays strictly within the lesson scope.
    enriched_prompt = system_prompt
    if lesson_goal:
        enriched_prompt += f"\n\nLesson goal: {lesson_goal}"
    if vocabulary:
        vocab_lines = "\n".join(
            "- "
            + v.get("word", "")
            + " = "
            + v.get("translation", "")
            + (f" ({v['pronunciation']})" if v.get("pronunciation") else "")
            + (f" — e.g. {v['example']}" if v.get("example") else "")
            for v in vocabulary
            if v.get("word")
        )
        enriched_prompt += f"\n\nVocabulary to cover in this lesson:\n{vocab_lines}"
    if phrases:
        phrase_lines = "\n".join(
            "- "
            + p.get("phrase", "")
            + " = "
            + p.get("translation", "")
            + (f" ({p['context']})" if p.get("context") else "")
            for p in phrases
            if p.get("phrase")
        )
        enriched_prompt += f"\n\nKey phrases to practise:\n{phrase_lines}"

    # Apply lesson-specific instructions before joining so the Realtime LLM
    # receives them at session creation time.
    agent.instructions = Instructions(input_text=enriched_prompt)

    # Grant admin role so the agent can publish audio.
    try:
        await call.update_call_members(
            update_members=[MemberRequest(user_id=AGENT_USER_ID, role="admin")]
        )
    except Exception as e:
        print(f"[agent] Warning: could not set admin role: {e}")

    # go_live is required for the default call type on Stream; safe to ignore on
    # other call types that don't need backstage mode.
    try:
        await call.go_live()
    except Exception as e:
        print(f"[agent] Warning: go_live failed (may be expected for this call type): {e}")

    # Accumulate transcript deltas and forward them as Stream custom events so
    # the mobile app can display real-time captions word-by-word.
    partial_agent: list[str] = []
    partial_user: list[str] = []

    async def on_transcript(event) -> None:
        nonlocal partial_agent, partial_user

        if isinstance(event, RealtimeAgentTranscript):
            if event.mode == "delta" and event.text:
                partial_agent.append(event.text)
                try:
                    await agent.send_custom_event({
                        "type": "transcript_partial",
                        "speaker": "agent",
                        "text": "".join(partial_agent),
                    })
                except Exception as e:
                    print(f"[agent] send_custom_event error: {e}")
            elif event.mode == "final":
                final_text = "".join(partial_agent)
                partial_agent.clear()
                if final_text:
                    try:
                        await agent.send_custom_event({
                            "type": "transcript_final",
                            "speaker": "agent",
                            "text": final_text,
                        })
                    except Exception as e:
                        print(f"[agent] send_custom_event error: {e}")

        elif isinstance(event, RealtimeUserTranscript):
            if event.mode == "delta" and event.text:
                partial_user.append(event.text)
                try:
                    await agent.send_custom_event({
                        "type": "transcript_partial",
                        "speaker": "user",
                        "text": "".join(partial_user),
                    })
                except Exception as e:
                    print(f"[agent] send_custom_event error: {e}")
            elif event.mode == "final":
                final_text = "".join(partial_user)
                partial_user.clear()
                if final_text:
                    try:
                        await agent.send_custom_event({
                            "type": "transcript_final",
                            "speaker": "user",
                            "text": final_text,
                        })
                    except Exception as e:
                        print(f"[agent] send_custom_event error: {e}")

        else:
            # Check for Stream custom events sent by the mobile app.
            # The PTT interrupt event asks us to cancel the current response
            # immediately so the student can speak without hearing the agent.
            try:
                custom: dict = {}
                if isinstance(event, dict):
                    custom = event.get("custom", {}) or {}
                elif hasattr(event, "custom"):
                    custom = event.custom or {}
                if custom.get("type") == "ptt_interrupt":
                    # Try each known cancellation approach in order.
                    for method_name in ("interrupt", "cancel", "cancel_response"):
                        fn = getattr(agent, method_name, None)
                        if callable(fn):
                            try:
                                await fn()
                                print("[agent] Response cancelled via ptt_interrupt")
                            except Exception:
                                pass
                            break
            except Exception:
                pass

    agent.subscribe(on_transcript)

    # Pass participant_wait_timeout=0 so join() does not auto-wait; we do it
    # explicitly below with a longer timeout suited for a lesson flow.
    async with agent.join(call, participant_wait_timeout=0):
        await agent.wait_for_participant(timeout=60.0)

        if intro_message:
            context = f"A student just joined your {language_name} lesson"
            if lesson_title:
                context += f" — '{lesson_title}'"
            context += (
                f". Deliver this greeting and NOTHING else: \"{intro_message}\" "
                f"After the greeting, ask the student one simple question to get them "
                f"talking — for example 'Are you ready to get started?' or "
                f"'Have you learned any {language_name} before?' "
                f"Then STOP and wait for the student's reply before teaching anything."
            )
        else:
            context = (
                f"A student just joined your {language_name} lesson. "
                f"Greet them warmly and ask one short question — like "
                f"'Ready to learn some {language_name}?' "
                f"Then STOP and wait for their reply before you teach anything."
            )

        await agent.simple_response(context)
        # Do NOT call agent.finish() here — that closes the Realtime connection
        # immediately after the greeting and makes the agent deaf to student input.
        # Instead, stay in this block so server_vad continues to detect speech
        # and trigger responses for the full lesson.
        try:
            await asyncio.sleep(3600)  # 1-hour ceiling; cancelled when the call ends
        except asyncio.CancelledError:
            pass


if __name__ == "__main__":
    _require_env("STREAM_API_KEY")
    _require_env("STREAM_API_SECRET")
    _require_env("OPENAI_API_KEY")

    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
