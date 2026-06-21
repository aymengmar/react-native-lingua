import { useAuth } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "@/tw";

export default function Index() {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }}>
      <Text className="h2 text-foreground">Home</Text>
      <Text className="body-md text-muted mt-2">You are signed in!</Text>

      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          marginTop: 32,
          backgroundColor: "#6C4EF5",
          borderRadius: 16,
          paddingVertical: 14,
          paddingHorizontal: 40,
        }}
        activeOpacity={0.85}
      >
        <Text className="body-md font-poppins-semibold text-white">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
