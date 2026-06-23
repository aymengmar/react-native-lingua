import { TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from "@/tw";
import { Image } from "@/tw/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { Lesson } from "@/types/learning";

export type LessonStatus = "completed" | "in-progress" | "not-started";

interface LessonCardProps {
  lesson: Lesson;
  status: LessonStatus;
  onPress: () => void;
}

export function LessonCard({ lesson, status, onPress }: LessonCardProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.card, isInProgress && styles.inProgressCard]}
    >
      {/* Lesson number label */}
      <Text className="caption text-muted mb-1.5">Lesson {lesson.order}</Text>

      {/* Content row */}
      <View className="flex-row items-center gap-3">
        {/* Left: title + badge + subtitle */}
        <View className="flex-1">
          <Text
            className="body-md font-poppins-semibold text-foreground"
            numberOfLines={1}
          >
            {lesson.title}
          </Text>

          {isInProgress && (
            <View style={styles.inProgressBadge}>
              <Text className="caption font-poppins-semibold text-lingua-purple">
                In progress
              </Text>
            </View>
          )}

          <Text className="caption text-muted mt-1.5">
            {lesson.vocabulary.length} words · {lesson.durationMinutes} min
          </Text>
        </View>

        {/* Right: thumbnail or status icon */}
        {isInProgress && lesson.imageUrl ? (
          <Image
            source={{ uri: lesson.imageUrl }}
            style={styles.thumbnail}
            contentFit="cover"
          />
        ) : isCompleted ? (
          <View style={styles.completedCircle}>
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          </View>
        ) : (
          <View style={styles.lockedCircle}>
            <Ionicons name="lock-closed" size={12} color="#9CA3AF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F2F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  inProgressCard: {
    borderColor: "#6C4EF5",
    borderWidth: 1.5,
    backgroundColor: "#FAFAFF",
  },
  inProgressBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF0FF",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 6,
  },
  thumbnail: {
    width: 76,
    height: 76,
    borderRadius: 12,
  },
  completedCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#58CC02",
    alignItems: "center",
    justifyContent: "center",
  },
  lockedCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
