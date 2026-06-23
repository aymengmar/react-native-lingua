import { useState } from "react";
import { TouchableOpacity, StatusBar, StyleSheet, View as RNView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "@/tw";
import { Image } from "@/tw/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { images } from "@/constants/images";
import { getLessonById, getUnitById } from "@/data/units";
import { getLanguageByCode } from "@/data/languages";

const FEEDBACK = [
  { label: "Speaking", value: "Excellent", color: "#22C55E" },
  { label: "Pronunciation", value: "Great", color: "#1CB0F6" },
  { label: "Grammar", value: "Good", color: "#4B6FDE" },
] as const;

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isMicOn, setIsMicOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const lesson = getLessonById(id);
  const unit = lesson ? getUnitById(lesson.unitId) : null;
  const language = unit ? getLanguageByCode(unit.languageCode) : null;

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 20 }}>
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const teacherPhrase = lesson.phrases[phraseIndex % lesson.phrases.length];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Header ──────────────────────────────────────────── */}
      <RNView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <RNView style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <RNView style={styles.onlineRow}>
            <RNView style={styles.onlineDot} />
            <Text style={styles.onlineLabel}>Online</Text>
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

        {/* Student video thumbnail — top-right */}
        <RNView style={styles.userPreview}>
          <RNView style={styles.userPreviewBg} />
          <RNView style={styles.userPreviewIcon}>
            <Ionicons name="person" size={54} color="#8B6A50" />
          </RNView>
        </RNView>

        {/* Teacher speech bubble */}
        <RNView style={styles.speechBubble}>
          <RNView style={styles.speechContent}>
            <Text style={styles.speechMain}>{teacherPhrase.phrase}</Text>
            <Text style={styles.speechSub}>{teacherPhrase.translation} 👏</Text>
          </RNView>
          <TouchableOpacity
            style={styles.speakerBtn}
            onPress={() => setPhraseIndex((i) => i + 1)}
            hitSlop={8}
          >
            <Ionicons name="volume-medium" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </RNView>
      </RNView>

      {/* ── Bottom section ───────────────────────────────────── */}
      <RNView style={[styles.bottomPanel, { paddingBottom: Math.max(insets.bottom, 16) }]}>

        {/* Lesson context */}
        <RNView style={styles.lessonContext}>
          <RNView style={styles.lessonContextRow}>
            {language && (
              <Text style={styles.lessonFlag}>{language.flag}</Text>
            )}
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
              style={styles.controlBtn}
              onPress={() => setIsMicOn((v) => !v)}
            >
              <Ionicons
                name={isMicOn ? "mic" : "mic-off"}
                size={22}
                color="#0F172A"
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Mic</Text>
          </RNView>

          <RNView style={styles.controlItem}>
            <TouchableOpacity
              style={[styles.controlBtn, !showSubtitles && styles.controlBtnOff]}
              onPress={() => setShowSubtitles((v) => !v)}
            >
              <Ionicons name="text" size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Subtitles</Text>
          </RNView>

          <RNView style={styles.controlItem}>
            <TouchableOpacity
              style={[styles.controlBtn, styles.endCallBtn]}
              onPress={() => router.back()}
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#C8B89A",
  },
  userPreviewIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 4,
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
