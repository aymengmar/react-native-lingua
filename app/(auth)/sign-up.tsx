import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { Text, View } from "@/tw";
import { Image } from "@/tw/image";
import { useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { usePostHog } from "posthog-react-native";

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const posthog = usePostHog();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const isLoading = fetchStatus === "fetching";

  const handleSignUp = async () => {
    posthog.capture("sign_up_submitted", { email });

    const { error } = await signUp.password({ emailAddress: email, password });
    if (error) {
      posthog.captureException(new Error(error.message), { screen: "SignUp", step: "password" });
      Alert.alert(
        "Sign Up Error",
        error.longMessage || error.message || "Something went wrong."
      );
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      posthog.captureException(new Error(sendError.message), { screen: "SignUp", step: "send_code" });
      Alert.alert(
        "Error",
        sendError.longMessage || sendError.message || "Failed to send code."
      );
      return;
    }

    setShowVerification(true);
  };

  const handleVerify = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) throw error;

    if (signUp.status === "complete") {
      posthog.identify(email, {
        $set: { email },
        $set_once: { first_sign_up_date: new Date().toISOString() },
      });
      posthog.capture("sign_up_completed", { email });

      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  const handleResend = async () => {
    const { error } = await signUp.verifications.sendEmailCode();
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
          <Text className="h2 text-foreground">Create your account</Text>
          <Text className="body-md text-muted mt-1">
            Start your language journey today ✨
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

          {/* Password */}
          <View style={[styles.inputContainer, styles.row, { marginTop: 14 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
              />
            </View>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up button */}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { marginTop: 24 },
              (!email || !password || isLoading) && styles.primaryBtnDisabled,
            ]}
            onPress={handleSignUp}
            activeOpacity={0.85}
            disabled={!email || !password || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-lg font-poppins-semibold text-white">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign in link */}
        <View className="flex-row justify-center items-center mt-8 pb-4">
          <Text className="body-md text-muted">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
            <Text className="body-md font-poppins-semibold text-lingua-purple">
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Required for Clerk's bot sign-up protection */}
        <View nativeID="clerk-captcha" />
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
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  eyeBtn: {
    paddingLeft: 12,
    paddingTop: 14,
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
