import { Text, View } from "@/tw";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { usePostHog } from "posthog-react-native";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View as RNView,
} from "react-native";

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
}

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
}: Props) {
  const posthog = usePostHog();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setError("");
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    if (code.length === 6) {
      handleVerify(code);
    }
  }, [code]);

  const handleChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digits);
    if (error) setError("");
  };

  const handleVerify = async (digits: string) => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      await onVerify(digits);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid code. Please try again.";
      posthog.capture("email_verification_failed", { email, error_message: message });
      setError(message);
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!onResend || loading) return;
    setLoading(true);
    setError("");
    posthog.capture("email_verification_code_resent", { email });
    try {
      await onResend();
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message || "Failed to resend code.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          {/* onStartShouldSetResponder stops taps on the sheet from closing the overlay */}
          <RNView style={styles.sheet} onStartShouldSetResponder={() => true}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Mail icon */}
            <View className="items-center mb-3">
              <View className="w-16 h-16 rounded-full bg-[#EEE9FE] items-center justify-center">
                <Ionicons name="mail-outline" size={32} color="#6C4EF5" />
              </View>
            </View>

            {/* Title */}
            <Text className="h3 text-foreground text-center mb-2">
              Check your email!
            </Text>

            {/* Subtitle */}
            <Text className="body-md text-muted text-center mb-8">
              {"We sent a 6-digit code to\n"}
              <Text className="body-md font-poppins-semibold text-foreground">
                {email || "your email"}
              </Text>
            </Text>

            {/* 6 digit boxes — tap any to re-focus the hidden input */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
              style={styles.digitsRow}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <RNView
                  key={i}
                  style={[
                    styles.digitBox,
                    code.length > i && styles.digitBoxFilled,
                    code.length === i && styles.digitBoxActive,
                  ]}
                >
                  <Text className="text-xl font-poppins-semibold text-foreground">
                    {code[i] ?? ""}
                  </Text>
                </RNView>
              ))}
            </TouchableOpacity>

            {/* Loading indicator */}
            {loading && (
              <ActivityIndicator
                size="small"
                color="#6C4EF5"
                style={{ marginTop: 16 }}
              />
            )}

            {/* Error message */}
            {!!error && (
              <Text
                className="body-sm text-center mt-4"
                style={{ color: "#EF4444" }}
              >
                {error}
              </Text>
            )}

            {/* Resend */}
            <TouchableOpacity onPress={handleResend} disabled={loading}>
              <Text className="body-sm text-muted text-center mt-6">
                {"Didn't receive it? "}
                <Text className="body-sm font-poppins-semibold text-lingua-purple">
                  Resend
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Hidden TextInput that captures digits from the number pad */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.hiddenInput}
              caretHidden
            />
          </RNView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 48,
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 16,
    padding: 4,
  },
  digitsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  digitBox: {
    width: 46,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F7FB",
  },
  digitBoxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#FFFFFF",
  },
  digitBoxActive: {
    borderColor: "#6C4EF5",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
    bottom: 0,
  },
});
