import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "@/tw";
import { Image } from "@/tw/image";
import { images } from "@/constants/images";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Logo Row */}
      <View className="flex-row items-center justify-center pt-3 gap-2">
        <Image source={images.mascotLogo} className="w-10 h-10" />
        <Text className="h3 text-foreground">muolingo</Text>
      </View>

      {/* Headline Section */}
      <View className="px-6 mt-6">
        <Text className="h1 text-foreground">Your AI language</Text>
        <Text className="h1 text-lingua-purple">teacher.</Text>
        <Text className="body-md text-muted mt-2">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot + Speech Bubbles */}
      <View className="flex-1 relative mt-2">
        <Image
          source={images.mascotWelcome}
          className="absolute inset-0"
          contentFit="contain"
          contentPosition="center"
        />

        {/* Hello! bubble — bottom left */}
        <View
          className="absolute bg-white rounded-[20px] px-4 py-[10px] bottom-[30%] left-[4%]"
          style={[styles.shadow, styles.rotateLeft]}
        >
          <Text className="text-[15px] font-poppins-medium text-foreground">
            Hello!
          </Text>
        </View>

        {/* ¡Hola! bubble — top right */}
        <View
          className="absolute bg-white rounded-[20px] px-4 py-[10px] top-[6%] right-[6%]"
          style={[styles.shadow, styles.rotateRight]}
        >
          <Text className="text-[15px] font-poppins-medium text-foreground">
            ¡Hola!
          </Text>
        </View>

        {/* 你好! bubble — bottom right */}
        <View
          className="absolute bg-white rounded-[20px] px-4 py-[10px] bottom-[18%] right-[6%]"
          style={[styles.shadow, styles.rotateLeftSmall]}
        >
          <Text className="text-[15px] font-poppins-medium text-danger">
            你好!
          </Text>
        </View>
      </View>

      {/* Get Started Button */}
      <View className="px-6 pb-8 pt-2">
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
          activeOpacity={0.85}
        >
          <Text className="text-lg font-poppins-semibold text-white">
            Get Started
          </Text>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Shadow — platform-specific (iOS shadowColor/Android elevation)
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  // Transforms — per style exception rules
  rotateLeft: {
    transform: [{ rotate: "-8deg" }],
  },
  rotateRight: {
    transform: [{ rotate: "6deg" }],
  },
  rotateLeftSmall: {
    transform: [{ rotate: "-5deg" }],
  },
  // TouchableOpacity — per style exception rules
  button: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    gap: 8,
  },
});
