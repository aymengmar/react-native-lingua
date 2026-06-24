import { images, placeholderImages } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { ScrollView, Text, View } from "@/tw";
import { Image } from "@/tw/image";
import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePostHog } from "posthog-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  ja: "こんにちは",
  pt: "Olá",
};

type PlanItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  completed: boolean;
};

export default function HomeScreen() {
  const { user } = useUser();
  const posthog = usePostHog();
  const { selectedLanguage } = useLanguageStore();
  const { currentXp, dailyGoalXp, streak, completedLessons } =
    useProgressStore();

  const language = selectedLanguage
    ? getLanguageByCode(selectedLanguage)
    : null;
  const units = selectedLanguage ? getUnitsByLanguage(selectedLanguage) : [];
  const currentUnit = units[0];
  const currentLesson = currentUnit?.lessons[0];

  const progressPercent = Math.min((currentXp / dailyGoalXp) * 100, 100);

  const firstName =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "there";

  const greeting = selectedLanguage
    ? (GREETINGS[selectedLanguage] ?? "Hello")
    : "Hello";

  const todaysPlan: PlanItem[] = currentLesson
    ? [
        {
          id: "lesson",
          icon: "book",
          iconBg: "#EEF2FF",
          iconColor: "#6C4EF5",
          title: "Lesson",
          subtitle: currentLesson.title,
          completed: completedLessons.includes(currentLesson.id),
        },
        {
          id: "ai-conversation",
          icon: "headset",
          iconBg: "#F3EDFF",
          iconColor: "#7C3AED",
          title: "AI Conversation",
          subtitle: "Talk about your day",
          completed: false,
        },
        {
          id: "new-words",
          icon: "chatbubble-ellipses",
          iconBg: "#FEE2E2",
          iconColor: "#EF4444",
          title: "New words",
          subtitle: `${currentLesson.vocabulary.length} words`,
          completed: false,
        },
      ]
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl">{language?.flag ?? "🌍"}</Text>
            <Text className="h4 text-foreground">
              {greeting}, {firstName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                style={{ width: 22, height: 22 }}
                contentFit="contain"
              />
              <Text className="body-md font-poppins-semibold text-streak">
                {streak}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#001328"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Daily Goal Card ── */}
        <View className="mx-5 mb-4 rounded-2xl overflow-hidden bg-[#FFF5EB]">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-1 pr-2">
              <Text className="body-sm text-muted mb-1">Daily goal</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="h2 text-foreground">{currentXp}</Text>
                <Text className="body-md text-muted">/ {dailyGoalXp} XP</Text>
              </View>

              {/* Progress bar */}
              <View className="mt-3 h-2.5 rounded-full overflow-hidden bg-[#F3D5B5]">
                <View
                  className="h-2.5 rounded-full bg-streak"
                  style={{ width: `${progressPercent}%` as `${number}%` }}
                />
              </View>
            </View>

            <Image
              source={images.treasure}
              style={{ width: 84, height: 84 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* ── Continue Learning Card ── */}
        {language && currentUnit && (
          <View className="mx-5 mb-4 rounded-2xl overflow-hidden min-h-[130px] bg-[#4848C2]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 p-5 pr-2">
                <Text
                  className="body-sm"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  Continue learning
                </Text>
                <Text className="h2" style={{ color: "#FFFFFF", marginTop: 2 }}>
                  {language.name}
                </Text>
                <Text
                  className="body-sm"
                  style={{ color: "rgba(255,255,255,0.72)", marginTop: 2 }}
                >
                  A1 · {currentUnit.title}
                </Text>
                <TouchableOpacity
                  style={styles.continueBtn}
                  activeOpacity={0.85}
                  onPress={() =>
                    posthog.capture("continue_learning_tapped", {
                      language: selectedLanguage,
                      unit: currentUnit?.title,
                    })
                  }
                >
                  <Text
                    className="body-md font-poppins-semibold"
                    style={{ color: "#4848C2" }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>

              <Image
                source={images.palace}
                style={{ width: 120, height: 120 }}
                contentFit="contain"
              />
            </View>
          </View>
        )}

        {/* ── Today's Plan ── */}
        {todaysPlan.length > 0 && (
          <View className="mx-5 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="h4 text-foreground">{"Today's plan"}</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="body-md font-poppins-semibold text-lingua-purple">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              style={styles.planCardShadow}
            >
              {todaysPlan.map((item, index) => (
                <View key={item.id}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      posthog.capture("todays_plan_item_tapped", {
                        item_id: item.id,
                        item_title: item.title,
                        completed: item.completed,
                        language: selectedLanguage,
                      })
                    }
                  >
                    <View className="flex-row items-center px-4 py-3 gap-3">
                      {/* Icon */}
                      <View
                        className="w-11 h-11 rounded-xl items-center justify-center"
                        style={{ backgroundColor: item.iconBg }}
                      >
                        <Ionicons
                          name={item.icon}
                          size={20}
                          color={item.iconColor}
                        />
                      </View>

                      {/* Text */}
                      <View className="flex-1">
                        <Text className="body-md font-poppins-semibold text-foreground">
                          {item.title}
                        </Text>
                        <Text className="body-sm text-muted">
                          {item.subtitle}
                        </Text>
                      </View>

                      {/* Status */}
                      {item.completed ? (
                        <View className="w-6 h-6 rounded-full bg-lingua-purple items-center justify-center">
                          <Ionicons
                            name="checkmark"
                            size={13}
                            color="#FFFFFF"
                          />
                        </View>
                      ) : (
                        <View className="w-6 h-6 rounded-full border-2 border-border" />
                      )}
                    </View>
                  </TouchableOpacity>

                  {index < todaysPlan.length - 1 && (
                    <View className="h-px mx-4 bg-gray-100" />
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Next Up Card ── */}
        <View className="mx-5">
          <View className="bg-green-50 rounded-2xl p-4 flex-row items-center gap-3">
            <View className="flex-1">
              <Text className="body-sm text-muted">Next up</Text>
              <Text className="h4 text-foreground mt-0.5">AI Video Call</Text>
              <Text className="body-sm text-muted">Practice speaking</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Image
                source={{ uri: placeholderImages.aiTeacherAvatar }}
                style={{ width: 52, height: 52, borderRadius: 26 }}
                contentFit="cover"
              />
              <TouchableOpacity
                style={styles.videoBtn}
                activeOpacity={0.85}
                onPress={() =>
                  posthog.capture("ai_video_call_started", {
                    language: selectedLanguage,
                  })
                }
              >
                <Ionicons name="videocam" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 9,
    alignSelf: "flex-start",
    marginTop: 14,
  },
  planCardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  videoBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#21C168",
    alignItems: "center",
    justifyContent: "center",
  },
});
