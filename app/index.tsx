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

      <View className="mt-8 rounded-2xl bg-white px-8 py-4">
        <Text className="text-lg font-bold text-green-600">Get Started</Text>
      </View>
    </View>
  );
}
