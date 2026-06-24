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
  Pressable,
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

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lesson = getLessonById(id);
  const unit = lesson ? getUnitById(lesson.unitId) : null;
  const language = unit ? getLanguageByCode(unit.languageCode) : null;

  const callId = lesson ? `lesson-${toCallId(lesson.id)}` : null;

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

  const { status: callStatus, agentStatus, agentCaption, userCaption, enableMic, disableMic, interruptAgent, endCall } =
    useAudioCall(callId, lessonContext);

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

  const handleMicPressIn = async () => {
    setIsSpeaking(true);
    // Fire both in parallel: interrupt the agent immediately AND open the mic.
    await Promise.all([interruptAgent(), enableMic()]);
    posthog.capture("ai_lesson_ptt_start", { lesson_id: lesson.id });
  };

  const handleMicPressOut = async () => {
    setIsSpeaking(false);
    await disableMic();
    posthog.capture("ai_lesson_ptt_stop", { lesson_id: lesson.id });
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

  const displayName = user?.fullName ?? user?.firstName ?? "You";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const canSpeak = callStatus === "joined" && agentStatus === "connected";

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
              style={[styles.onlineLabel, { color: statusColor(callStatus) }]}
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

        {/* End call button — top right */}
        <TouchableOpacity
          onPress={handleEndCall}
          style={styles.endCallHeaderBtn}
          hitSlop={8}
        >
          <RNView style={styles.endCallIconWrap}>
            <Ionicons name="call" size={20} color="#FFFFFF" />
          </RNView>
        </TouchableOpacity>
      </RNView>

      {/* ── Main area ───────────────────────────────────────── */}
      <RNView style={styles.mainArea}>
        <Image
          source={images.mascotWelcome}
          style={styles.mascot}
          contentFit="contain"
        />

        {/* Student preview — top-right corner */}
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
          {/* Speaking badge when mic is active */}
          {isSpeaking && (
            <RNView style={styles.speakingBadge}>
              <Ionicons name="mic" size={10} color="#FFFFFF" />
            </RNView>
          )}
        </RNView>

        {/* User live caption — appears near the user preview when the student speaks */}
        {userCaption ? (
          <RNView style={styles.userCaptionBubble}>
            <RNView style={styles.userCaptionHeader}>
              <RNView style={styles.captionLiveDot} />
              <Text style={styles.userCaptionLabel}>You</Text>
            </RNView>
            <Text style={styles.userCaptionText} numberOfLines={3}>
              {userCaption}
            </Text>
          </RNView>
        ) : null}

        {/* Teacher speech bubble — shows live agent caption or the lesson phrase hint */}
        <RNView style={styles.speechBubble}>
          <RNView style={styles.speechContent}>
            {agentCaption ? (
              <>
                <RNView style={styles.agentCaptionHeader}>
                  <RNView style={[styles.captionLiveDot, styles.captionLiveDotPurple]} />
                  <Text style={styles.agentCaptionLabel}>AI Teacher</Text>
                </RNView>
                <Text style={styles.speechMain} numberOfLines={4}>
                  {agentCaption}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.speechMain}>{teacherPhrase.phrase}</Text>
                <Text style={styles.speechSub}>
                  {teacherPhrase.translation} 👏
                </Text>
              </>
            )}
          </RNView>
          {!agentCaption && (
            <TouchableOpacity
              style={styles.speakerBtn}
              onPress={() => setPhraseIndex((i) => i + 1)}
              hitSlop={8}
            >
              <Ionicons name="volume-medium" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </RNView>

        {/* Connecting overlay */}
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
          { paddingBottom: Math.max(insets.bottom, 20) },
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

        {/* Push-to-talk mic button */}
        <RNView style={styles.pttRow}>
          <Pressable
            onPressIn={handleMicPressIn}
            onPressOut={handleMicPressOut}
            disabled={!canSpeak}
            style={({ pressed }) => [
              styles.pttBtn,
              pressed && styles.pttBtnActive,
              !canSpeak && styles.pttBtnDisabled,
            ]}
          >
            <Ionicons
              name={isSpeaking ? "mic" : "mic-outline"}
              size={34}
              color="#FFFFFF"
            />
          </Pressable>
          <Text style={styles.pttLabel}>
            {!canSpeak
              ? agentStatus === "connecting"
                ? "Teacher joining…"
                : "Connecting…"
              : isSpeaking
              ? "Listening…"
              : "Hold to speak"}
          </Text>
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
  },
  onlineLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    lineHeight: 18,
  },
  endCallHeaderBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  endCallIconWrap: {
    transform: [{ rotate: "135deg" }],
  },

  // ── Main area ──────────────────────────────────────────────
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
  speakingBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#22C55E",
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
    marginBottom: 20,
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

  // ── Push-to-talk ─────────────────────────────────────────────
  pttRow: {
    alignItems: "center",
    marginBottom: 20,
  },
  pttBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  pttBtnActive: {
    backgroundColor: "#22C55E",
    shadowColor: "#22C55E",
    shadowOpacity: 0.5,
    transform: [{ scale: 1.08 }],
  },
  pttBtnDisabled: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0,
    elevation: 0,
  },
  pttLabel: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#64748B",
    textAlign: "center",
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

  // ── Live captions ─────────────────────────────────────────────
  captionLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  captionLiveDotPurple: {
    backgroundColor: "#6C4EF5",
  },
  agentCaptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  agentCaptionLabel: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
    letterSpacing: 0.3,
  },
  userCaptionBubble: {
    position: "absolute",
    top: 134,
    right: 14,
    maxWidth: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderTopRightRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  userCaptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 3,
  },
  userCaptionLabel: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
    color: "#22C55E",
    letterSpacing: 0.3,
  },
  userCaptionText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#0F172A",
    lineHeight: 18,
  },
});
