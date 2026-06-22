import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    description: "Spoken by 500M+ people worldwide",
    learners: "28.4M learners",
    totalUnits: 3,
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    description: "The language of love and culture",
    learners: "19.4M learners",
    totalUnits: 2,
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    description: "Precise and powerful European language",
    learners: "8.1M learners",
    totalUnits: 2,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: "Fascinating writing and rich culture",
    learners: "12.7M learners",
    totalUnits: 2,
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇧🇷",
    description: "Spoken across Brazil and Portugal",
    learners: "11.2M learners",
    totalUnits: 2,
  },
];

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find((l) => l.code === code);
}
