import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "@/tw";
import { Image } from "@/tw/image";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";
import { useSignIn } from "@clerk/expo";
import { usePostHog } from "posthog-react-native";

export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn();
  const posthog = usePostHog();

  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const isLoading = fetchStatus === "fetching";

  const handleSignIn = async () => {
    posthog.capture("sign_in_submitted", { email });

    const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
    if (error) {
      posthog.captureException(new Error(error.message), { screen: "SignIn", step: "send_code" });
      Alert.alert(
        "Sign In Error",
        error.longMessage || error.message || "Something went wrong."
      );
      return;
    }
    setShowVerification(true);
  };

  const handleVerify = async (code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) throw error;

    if (signIn.status === "complete") {
      posthog.identify(email, {
        $set: { email },
        $set_once: { first_sign_in_date: new Date().toISOString() },
      });
      posthog.capture("sign_in_completed", { email });

      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  const handleResend = async () => {
    const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
    if (error) throw error;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#001328" />
        </TouchableOpacity>

        {/* Heading */}
        <View className="px-6 mt-2">
          <Text className="h2 text-foreground">Welcome back!</Text>
          <Text className="body-md text-muted mt-1">
            Continue your language journey 🎯
          </Text>
        </View>

        {/* Mascot */}
        <View className="items-center mt-5 mb-5">
          <Image
            source={images.mascotAuth}
            style={{ width: 168, height: 168 }}
            contentFit="contain"
          />
        </View>

        {/* Form */}
        <View className="px-6">
          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>

          {/* Sign In button */}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { marginTop: 24 },
              (!email || isLoading) && styles.primaryBtnDisabled,
            ]}
            onPress={handleSignIn}
            activeOpacity={0.85}
            disabled={!email || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-lg font-poppins-semibold text-white">
                Sign In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View className="flex-row justify-center items-center mt-8 pb-4">
          <Text className="body-md text-muted">{"Don't have an account? "}</Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
            <Text className="body-md font-poppins-semibold text-lingua-purple">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        visible={showVerification}
        email={email}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  backBtn: {
    marginLeft: 12,
    marginTop: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginBottom: 2,
  },
  textInput: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#001328",
    padding: 0,
    margin: 0,
  },
  primaryBtn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
});
