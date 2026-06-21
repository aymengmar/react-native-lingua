import { Text, View } from "@/tw";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  View as RNView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
}

export default function VerificationModal({ visible, email, onClose }: Props) {
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
          {/* Stop tap propagation to overlay */}
          <RNView style={styles.sheet} onStartShouldSetResponder={() => true}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Email icon */}
            <View className="items-center mb-3">
              <View className="w-16 h-16 rounded-full bg-[#EEE9FE] items-center justify-center">
                <Ionicons name="mail-outline" size={32} color="#6C4EF5" />
              </View>
            </View>

            {/* Title */}
            <Text className="h3 text-foreground text-center mb-2">
              Verify your email
            </Text>

            {/* Subtitle */}
            <Text className="body-md text-muted text-center mb-8">
              We sent a verification link to
              <Text className="body-md font-poppins-semibold text-foreground">
                {" "}
                {email || "your email"}
              </Text>
              . Please check your inbox and follow the link to continue.
            </Text>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text className="text-lg font-poppins-semibold text-white">
                Back to sign in
              </Text>
            </TouchableOpacity>
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
  primaryBtn: {
    marginTop: 16,
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
