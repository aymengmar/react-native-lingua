import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/tw";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-green-500 px-6">
      <Text className="h2 mt-9 text-center color-lingua-purple">
        Duolingo Clone
      </Text>

      <Text className="mt-4 text-xl font-semibold text-white text-center">
        Aymen App is working 🎉
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboarding")}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-bold text-green-600">View Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
