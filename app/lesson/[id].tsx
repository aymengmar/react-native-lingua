import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getLessonById, getUnitById } from "@/data/units";
import { useAudioCall, type AgentStatus } from "@/hooks/useAudioCall";
import { toCallId } from "@/lib/stream";
import { Text } from "@/tw";
import { Image } from "@/tw/image";
import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { usePostHog } from "posthog-react-native";
import {
  View as RNView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const FEEDBACK = [
  { label: "Speaking", value: "Excellent", color: "#22C55E" },
  { label: "Pronunciation", value: "Great", color: "#1CB0F6" },
  { label: "Grammar", value: "Good", color: "#4B6FDE" },
] as const;

/** Map a Stream calling state to a human-readable label shown in the header. */
function statusLabel(
  status: "idle" | "connecting" | "joined" | "reconnecting" | "error" | "ended"
): string {
  switch (status) {
    case "connecting":
      return "Connecting…";
    case "joined":
      return "Online";
    case "reconnecting":
      return "Reconnecting…";
    case "error":
      return "Connection failed";
    case "ended":
      return "Call ended";
    default:
      return "Connecting…";
  }
}

/** Dot color for the connection indicator in the header. */
function statusColor(
  status: "idle" | "connecting" | "joined" | "reconnecting" | "error" | "ended"
): string {
  switch (status) {
    case "joined":
      return "#22C55E";
    case "error":
    case "ended":
      return "#EF4444";
    default:
      return "#F59E0B";
  }
}

function agentStatusLabel(s: AgentStatus): string {
  switch (s) {
    case "connecting":
      return "Agent joining…";
    case "connected":
      return "Agent ready";
    case "failed":
      return "Agent unavailable";
    default:
      return "Agent idle";
  }
}

function agentStatusColor(s: AgentStatus): string {
  switch (s) {
    case "connected":
      return "#6C4EF5";
    case "failed":
      return "#EF4444";
    case "connecting":
      return "#F59E0B";
    default:
      return "#94A3B8";
  }
}

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const posthog = usePostHog();
  const { user } = useUser();

  const [showSubtitles, setShowSubtitles] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const lesson = getLessonById(id);
  const unit = lesson ? getUnitById(lesson.unitId) : null;
  const language = unit ? getLanguageByCode(unit.languageCode) : null;

  // Build a deterministic call ID from the lesson ID so every student who
  // opens the same lesson joins the same audio room.
  const callId = lesson ? `lesson-${toCallId(lesson.id)}` : null;

  // Build lesson context once; values don't change during a lesson.
  const lessonContext =
    lesson && unit
      ? {
          language: unit.languageCode,
          lessonTitle: lesson.title,
          goal: lesson.goal,
          aiTeacherPrompt: lesson.aiTeacherPrompt,
          vocabulary: lesson.vocabulary,
          phrases: lesson.phrases,
        }
      : null;

  // Stream audio_room call — joins immediately, starts Vision Agent, cleans up on unmount.
  const { status: callStatus, agentStatus, isMuted, toggleMic, endCall } =
    useAudioCall(callId, lessonContext);

  // Track lesson start
  useEffect(() => {
    if (lesson) {
      posthog.capture("ai_lesson_started", {
        lesson_id: lesson.id,
        lesson_title: lesson.title,
        unit_id: lesson.unitId,
        language_code: unit?.languageCode || "unknown",
        xp_reward: lesson.xpReward,
      });
    }
  }, [lesson?.id, posthog, unit?.languageCode]);

  // Track phrase advancement
  useEffect(() => {
    if (lesson && phraseIndex > 0) {
      posthog.capture("ai_lesson_phrase_advanced", {
        lesson_id: lesson.id,
        phrase_index: phraseIndex,
        total_phrases: lesson.phrases.length,
      });
    }
  }, [phraseIndex, lesson?.id, posthog]);

  if (!lesson) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        edges={["top"]}
      >
        <TouchableOpacity
          onPress={() => {
            posthog.capture("lesson_not_found_back_pressed");
            router.back();
          }}
          style={{ padding: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const teacherPhrase = lesson.phrases[phraseIndex % lesson.phrases.length];

  const handleMicToggle = async () => {
    await toggleMic();
    posthog.capture("ai_lesson_mic_toggled", {
      lesson_id: lesson.id,
      mic_enabled: isMuted, // will be toggled after this call
    });
  };

  const handleSubtitlesToggle = () => {
    const newState = !showSubtitles;
    setShowSubtitles(newState);
    posthog.capture("ai_lesson_subtitles_toggled", {
      lesson_id: lesson.id,
      subtitles_enabled: newState,
    });
  };

  const handleEndCall = async () => {
    posthog.capture("ai_lesson_ended", {
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      phrases_completed: phraseIndex,
      total_phrases: lesson.phrases.length,
    });
    await endCall();
    router.back();
  };

  const handleBackPress = () => {
    posthog.capture("ai_lesson_back_pressed", {
      lesson_id: lesson.id,
      phrases_completed: phraseIndex,
    });
    router.back();
  };

  const handlePhraseAdvance = () => {
    setPhraseIndex((i) => i + 1);
  };

  const displayName = user?.fullName ?? user?.firstName ?? "You";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Header ──────────────────────────────────────────── */}
      <RNView style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backBtn}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <RNView style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <RNView style={styles.onlineRow}>
            <RNView
              style={[
                styles.onlineDot,
                { backgroundColor: statusColor(callStatus) },
              ]}
            />
            <Text
              style={[
                styles.onlineLabel,
                { color: statusColor(callStatus) },
              ]}
            >
              {statusLabel(callStatus)}
            </Text>
          </RNView>
          <RNView style={styles.onlineRow}>
            <RNView
              style={[
                styles.onlineDot,
                { backgroundColor: agentStatusColor(agentStatus) },
              ]}
            />
            <Text
              style={[
                styles.onlineLabel,
                { color: agentStatusColor(agentStatus) },
              ]}
            >
              {agentStatusLabel(agentStatus)}
            </Text>
          </RNView>
        </RNView>

        <RNView style={styles.headerRight}>
          <RNView style={styles.headerIconBtn}>
            <Ionicons name="videocam-outline" size={16} color="#0F172A" />
          </RNView>
          <Text style={styles.headerCount}>12</Text>
          <RNView style={styles.headerIconBtn}>
            <Ionicons name="notifications-outline" size={17} color="#0F172A" />
          </RNView>
        </RNView>
      </RNView>

      {/* ── Main area (room background) ─────────────────────── */}
      <RNView style={styles.mainArea}>
        <Image
          source={images.mascotWelcome}
          style={styles.mascot}
          contentFit="contain"
        />

        {/* Student preview — top-right corner with user initials */}
        <RNView style={styles.userPreview}>
          <RNView style={styles.userPreviewBg} />
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          ) : (
            <RNView style={styles.userInitialsWrap}>
              <Text style={styles.userInitials}>{initials}</Text>
            </RNView>
          )}
          {/* Muted badge on the student preview */}
          {isMuted && (
            <RNView style={styles.mutedBadge}>
              <Ionicons name="mic-off" size={10} color="#FFFFFF" />
            </RNView>
          )}
        </RNView>

        {/* Teacher speech bubble */}
        <RNView style={styles.speechBubble}>
          <RNView style={styles.speechContent}>
            <Text style={styles.speechMain}>{teacherPhrase.phrase}</Text>
            {showSubtitles && (
              <Text style={styles.speechSub}>
                {teacherPhrase.translation} 👏
              </Text>
            )}
          </RNView>
          <TouchableOpacity
            style={styles.speakerBtn}
            onPress={handlePhraseAdvance}
            hitSlop={8}
          >
            <Ionicons name="volume-medium" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </RNView>

        {/* Connecting overlay — shown while Stream call is joining */}
        {(callStatus === "connecting" || callStatus === "idle") && (
          <RNView style={styles.overlay}>
            <ActivityIndicator size="large" color="#6C4EF5" />
            <Text style={styles.overlayText}>Joining lesson…</Text>
          </RNView>
        )}

        {/* Reconnecting overlay */}
        {callStatus === "reconnecting" && (
          <RNView style={styles.overlay}>
            <ActivityIndicator size="large" color="#F59E0B" />
            <Text style={styles.overlayText}>Reconnecting…</Text>
          </RNView>
        )}

        {/* Error overlay */}
        {callStatus === "error" && (
          <RNView style={styles.overlay}>
            <Ionicons name="warning-outline" size={40} color="#EF4444" />
            <Text style={styles.overlayText}>Could not connect</Text>
            <Text style={styles.overlaySubText}>
              Check your connection and try again
            </Text>
          </RNView>
        )}

        {/* Ended overlay */}
        {callStatus === "ended" && (
          <RNView style={styles.overlay}>
            <Ionicons name="checkmark-circle-outline" size={40} color="#22C55E" />
            <Text style={styles.overlayText}>Lesson complete!</Text>
          </RNView>
        )}
      </RNView>

      {/* ── Bottom section ───────────────────────────────────── */}
      <RNView
        style={[
          styles.bottomPanel,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Lesson context */}
        <RNView style={styles.lessonContext}>
          <RNView style={styles.lessonContextRow}>
            {language && <Text style={styles.lessonFlag}>{language.flag}</Text>}
            <Text style={styles.lessonLang} numberOfLines={1}>
              {language?.name ?? ""} · {lesson.title}
            </Text>
          </RNView>
          <Text style={styles.lessonGoal} numberOfLines={2}>
            {lesson.goal}
          </Text>
        </RNView>

        {/* Controls row */}
        <RNView style={styles.controlsRow}>
          <RNView style={styles.controlItem}>
            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="videocam-off" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Camera</Text>
          </RNView>

          <RNView style={styles.controlItem}>
            <TouchableOpacity
              style={[styles.controlBtn, isMuted && styles.controlBtnOff]}
              onPress={handleMicToggle}
              disabled={callStatus !== "joined"}
            >
              <Ionicons
                name={isMuted ? "mic-off" : "mic"}
                size={22}
                color={isMuted ? "#94A3B8" : "#0F172A"}
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>{isMuted ? "Unmute" : "Mic"}</Text>
          </RNView>

          <RNView style={styles.controlItem}>
            <TouchableOpacity
              style={[
                styles.controlBtn,
                !showSubtitles && styles.controlBtnOff,
              ]}
              onPress={handleSubtitlesToggle}
            >
              <Ionicons name="text" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Subtitles</Text>
          </RNView>

          <RNView style={styles.controlItem}>
            <TouchableOpacity
              style={[styles.controlBtn, styles.endCallBtn]}
              onPress={handleEndCall}
            >
              <RNView style={styles.endCallIconWrap}>
                <Ionicons name="call" size={22} color="#FFFFFF" />
              </RNView>
            </TouchableOpacity>
            <Text style={styles.controlLabel}>End Call</Text>
          </RNView>
        </RNView>

        {/* Feedback card */}
        <RNView style={styles.feedbackCard}>
          {FEEDBACK.map((item, i) => (
            <RNView
              key={item.label}
              style={[styles.feedbackItem, i > 0 && styles.feedbackBorder]}
            >
              <Text style={styles.feedbackLabel}>{item.label}</Text>
              <Text style={[styles.feedbackValue, { color: item.color }]}>
                {item.value}
              </Text>
            </RNView>
          ))}
        </RNView>
      </RNView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleGroup: {
    flex: 1,
    paddingLeft: 6,
  },
  headerTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 26,
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  onlineLabel: {
    color: "#22C55E",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    lineHeight: 18,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCount: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 20,
  },

  // ── Main area (room background) ──────────────────────────────
  mainArea: {
    flex: 1,
    position: "relative",
    backgroundColor: "#C8B49A",
  },
  mascot: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  userPreview: {
    position: "absolute",
    top: 12,
    right: 14,
    width: 88,
    height: 114,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  userPreviewBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#C8B89A",
  },
  userInitialsWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C4EF5",
  },
  userInitials: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Poppins-Bold",
  },
  mutedBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  speechBubble: {
    position: "absolute",
    bottom: 18,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  speechContent: {
    flex: 1,
  },
  speechMain: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#0F172A",
    lineHeight: 22,
  },
  speechSub: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#475569",
    marginTop: 2,
    lineHeight: 20,
  },
  speakerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  // ── State overlays ───────────────────────────────────────────
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  overlayText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  overlaySubText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    paddingHorizontal: 32,
  },

  // ── Bottom section ───────────────────────────────────────────
  bottomPanel: {
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingHorizontal: 20,
  },

  // ── Lesson context ───────────────────────────────────────────
  lessonContext: {
    marginBottom: 14,
  },
  lessonContextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  lessonFlag: {
    fontSize: 16,
    lineHeight: 20,
  },
  lessonLang: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#0F172A",
    flex: 1,
  },
  lessonGoal: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#64748B",
    lineHeight: 18,
  },

  // ── Controls ─────────────────────────────────────────────────
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  controlItem: {
    alignItems: "center",
    gap: 8,
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  controlBtnOff: {
    backgroundColor: "#F1F5F9",
  },
  endCallBtn: {
    backgroundColor: "#EF4444",
    borderWidth: 0,
    shadowColor: "#EF4444",
    shadowOpacity: 0.35,
  },
  endCallIconWrap: {
    transform: [{ rotate: "135deg" }],
  },
  controlLabel: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#64748B",
  },

  // ── Feedback card ────────────────────────────────────────────
  feedbackCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  feedbackItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  feedbackBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#E2E8F0",
  },
  feedbackLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#64748B",
  },
  feedbackValue: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
