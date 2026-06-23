export type LanguageCode = "es" | "fr" | "de" | "ja" | "pt";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  learners: string;
  totalUnits: number;
}

export type ActivityType =
  | "vocabulary"
  | "phrase"
  | "translation"
  | "listening"
  | "speaking"
  | "matching";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  xpReward: number;
  durationMinutes: number;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  goal: string;
  imageUrl?: string;
  // Prompt used for future AI teacher (Vision Agent) audio lessons
  aiTeacherPrompt: string;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  color: string;
  lessons: Lesson[];
}
