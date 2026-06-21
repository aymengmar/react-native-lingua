import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { View, Text } from "@/tw";
import { Image } from "@/tw/image";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

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
            style={[styles.primaryBtn, { marginTop: 24 }]}
            onPress={() => setShowVerification(true)}
            activeOpacity={0.85}
          >
            <Text className="text-lg font-poppins-semibold text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center px-6 my-6">
          <View className="flex-1 bg-border" style={{ height: 1 }} />
          <Text className="body-sm text-muted mx-3">or continue with</Text>
          <View className="flex-1 bg-border" style={{ height: 1 }} />
        </View>

        {/* Social buttons */}
        <View className="px-6" style={{ gap: 12 }}>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text className="body-md font-poppins-medium text-foreground" style={{ marginLeft: 12 }}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <FontAwesome name="facebook" size={20} color="#1877F2" />
            <Text className="body-md font-poppins-medium text-foreground" style={{ marginLeft: 12 }}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <AntDesign name="apple" size={20} color="#000000" />
            <Text className="body-md font-poppins-medium text-foreground" style={{ marginLeft: 12 }}>
              Continue with Apple
            </Text>
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
      </ScrollView>

      <VerificationModal
        visible={showVerification}
        email={email}
        onClose={() => setShowVerification(false)}
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
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
});
