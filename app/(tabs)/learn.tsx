import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "@/tw";
import { Image } from "@/tw/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { getUnitsByLanguage } from "@/data/units";
import { getLanguageByCode } from "@/data/languages";
import { LessonCard, type LessonStatus } from "@/components/LessonCard";
import { images } from "@/constants/images";
import type { Lesson } from "@/types/learning";

type Tab = "lessons" | "practice";

function getLessonStatus(
  lesson: Lesson,
  completedLessons: string[],
  allLessons: Lesson[]
): LessonStatus {
  if (completedLessons.includes(lesson.id)) return "completed";
  const firstIncomplete = allLessons.find((l) => !completedLessons.includes(l.id));
  if (firstIncomplete?.id === lesson.id) return "in-progress";
  return "not-started";
}

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("lessons");
  const router = useRouter();

  const { selectedLanguage } = useLanguageStore();
  const { completedLessons } = useProgressStore();

  const language = selectedLanguage ? getLanguageByCode(selectedLanguage) : null;
  const units = selectedLanguage ? getUnitsByLanguage(selectedLanguage) : [];
  const currentUnit = units[0];
  const lessons = currentUnit?.lessons ?? [];

  const completedCount = lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;

  // Count in-progress lesson as partially done for the header count
  const inProgressExists = lessons.some(
    (l) => !completedLessons.includes(l.id) && getLessonStatus(l, completedLessons, lessons) === "in-progress"
  );
  const progressCount = completedCount + (inProgressExists ? 1 : 0);

  // No language selected guard
  if (!language || !currentUnit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-4xl mb-4">📚</Text>
          <Text className="h3 text-foreground text-center">No language selected</Text>
          <Text className="body-md text-muted text-center mt-2">
            Go to the home tab and choose a language to start learning.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        {/* ── Header ─────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-1">
          {/* Language flag placeholder (tab screens have no back) */}
          <View className="w-10 h-10 rounded-full bg-surface items-center justify-center">
            <Text className="text-xl">{language.flag}</Text>
          </View>

          <View className="items-center flex-1 mx-3">
            <Text className="h4 text-foreground" numberOfLines={1}>
              {currentUnit.title}
            </Text>
            <Text className="caption text-muted mt-0.5">
              Unit {currentUnit.order} · {progressCount}/{lessons.length} lessons
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bookmarkBtn}
            hitSlop={8}
          >
            <Ionicons name="bookmark-outline" size={20} color="#6C4EF5" />
          </TouchableOpacity>
        </View>

        {/* ── Unit Banner ─────────────────────────────────── */}
        <View style={styles.banner}>
          {/* Building + trees on the right */}
          <Image
            source={images.palace}
            style={styles.bannerPalace}
            contentFit="contain"
          />
          {/* Fox mascot on the left */}
          <Image
            source={images.mascotWelcome}
            style={styles.bannerMascot}
            contentFit="contain"
          />
        </View>

        {/* ── Tabs ───────────────────────────────────────── */}
        <View className="flex-row mx-5 mt-4 mb-1">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("lessons")}
            style={[styles.tab, activeTab === "lessons" && styles.tabActive]}
          >
            <Text
              className={
                activeTab === "lessons"
                  ? "body-md font-poppins-semibold text-lingua-purple"
                  : "body-md text-muted"
              }
            >
              Lessons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("practice")}
            style={[styles.tab, activeTab === "practice" && styles.tabActive]}
          >
            <Text
              className={
                activeTab === "practice"
                  ? "body-md font-poppins-semibold text-lingua-purple"
                  : "body-md text-muted"
              }
            >
              Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Tab Divider ─────────────────────────────────── */}
        <View className="h-px bg-border mx-5 mb-4" />

        {/* ── Content ────────────────────────────────────── */}
        {activeTab === "lessons" ? (
          <View className="px-5">
            {lessons.map((lesson) => {
              const status = getLessonStatus(lesson, completedLessons, lessons);
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={status}
                  onPress={() => router.push(`/lesson/${lesson.id}`)}
                />
              );
            })}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-8 pt-16">
            <Text className="text-5xl mb-4">🎯</Text>
            <Text className="h3 text-foreground text-center">
              Practice mode
            </Text>
            <Text className="body-md text-muted text-center mt-2">
              Vocabulary drills and review sessions are coming soon.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    height: 190,
    backgroundColor: "#EEF0FF",
    overflow: "hidden",
  },
  bannerPalace: {
    position: "absolute",
    right: -15,
    bottom: -5,
    width: 210,
    height: 185,
  },
  bannerMascot: {
    position: "absolute",
    left: 8,
    bottom: 0,
    width: 150,
    height: 170,
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    paddingBottom: 10,
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#6C4EF5",
  },
});
