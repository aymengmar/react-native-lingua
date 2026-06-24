import { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "@/tw";
import { Image } from "@/tw/image";
import { languages } from "@/data/languages";
import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/languageStore";
import type { Language, LanguageCode } from "@/types/learning";
import { usePostHog } from "posthog-react-native";

export default function LanguageSelection() {
  const router = useRouter();
  const posthog = usePostHog();
  const { setSelectedLanguage } = useLanguageStore();
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState<LanguageCode>("es");

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#001328" />
        </TouchableOpacity>
        <Text className="h3 text-foreground text-center flex-1">
          Choose a language
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search bar */}
      <View className="px-4 mb-4">
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search languages"
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Popular label */}
      <Text className="body-md font-poppins-semibold text-foreground px-4 mb-2">
        Popular
      </Text>

      {/* Language list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <LanguageItem
            language={item}
            selected={selectedCode === item.code}
            onPress={() => setSelectedCode(item.code)}
          />
        )}
      />

      {/* Confirm button */}
      <View className="px-4 pt-2 pb-3">
        <TouchableOpacity
          onPress={() => {
            const lang = languages.find((l) => l.code === selectedCode);
            posthog.capture("language_selected", {
              language_code: selectedCode,
              language_name: lang?.name ?? null,
            });
            setSelectedLanguage(selectedCode);
            router.replace("/");
          }}
          style={styles.confirmButton}
          activeOpacity={0.85}
        >
          <Text className="body-lg font-poppins-semibold text-white">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>

      {/* Earth illustration */}
      <Image
        source={images.earth}
        style={styles.earthImage}
        contentFit="cover"
      />
    </SafeAreaView>
  );
}

function LanguageItem({
  language,
  selected,
  onPress,
}: {
  language: Language;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.languageRow, selected && styles.languageRowSelected]}
      activeOpacity={0.7}
    >
      <View style={styles.flagCircle}>
        <Text className="text-2xl">{language.flag}</Text>
      </View>
      <View className="flex-1 ml-3">
        <Text className="body-md font-poppins-semibold text-foreground">
          {language.name}
        </Text>
        <Text className="caption text-muted">{language.learners}</Text>
      </View>
      {selected ? (
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#6B7280" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#001328",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  languageRowSelected: {
    borderColor: "#6C4EF5",
    backgroundColor: "#F5F3FF",
  },
  flagCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  earthImage: {
    width: "100%",
    height: 140,
  },
});
