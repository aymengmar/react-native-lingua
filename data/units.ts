import type { Unit } from "@/types/learning";
import {
  esLesson1, esLesson2, esLesson3, esLesson4, esLesson5, esLesson6,
  frLesson1, frLesson2, frLesson3, frLesson4, frLesson5, frLesson6,
  deLesson1, deLesson2, deLesson3, deLesson4, deLesson5, deLesson6,
  ptLesson1, ptLesson2, ptLesson3, ptLesson4, ptLesson5, ptLesson6,
  jaLesson1, jaLesson2, jaLesson3, jaLesson4, jaLesson5, jaLesson6,
} from "@/data/lessons";

export const units: Unit[] = [
  // ─── Spanish ──────────────────────────────────────────────────────────────
  {
    id: "es-unit-1",
    languageCode: "es",
    order: 1,
    title: "Everyday Conversations",
    description: "Greetings, daily life, café, travel, shopping & family",
    color: "#58CC02",
    lessons: [esLesson1, esLesson2, esLesson3, esLesson4, esLesson5, esLesson6],
  },

  // ─── French ───────────────────────────────────────────────────────────────
  {
    id: "fr-unit-1",
    languageCode: "fr",
    order: 1,
    title: "La Vie Quotidienne",
    description: "Greetings, daily life, café, travel, shopping & family",
    color: "#1CB0F6",
    lessons: [frLesson1, frLesson2, frLesson3, frLesson4, frLesson5, frLesson6],
  },

  // ─── German ───────────────────────────────────────────────────────────────
  {
    id: "de-unit-1",
    languageCode: "de",
    order: 1,
    title: "Alltagsdeutsch",
    description: "Greetings, daily life, café, travel, shopping & family",
    color: "#FFCB00",
    lessons: [deLesson1, deLesson2, deLesson3, deLesson4, deLesson5, deLesson6],
  },

  // ─── Portuguese ───────────────────────────────────────────────────────────
  {
    id: "pt-unit-1",
    languageCode: "pt",
    order: 1,
    title: "Português do Dia a Dia",
    description: "Greetings, daily life, café, travel, shopping & family",
    color: "#21C168",
    lessons: [ptLesson1, ptLesson2, ptLesson3, ptLesson4, ptLesson5, ptLesson6],
  },

  // ─── Japanese ─────────────────────────────────────────────────────────────
  {
    id: "ja-unit-1",
    languageCode: "ja",
    order: 1,
    title: "にちじょう にほんご",
    description: "Greetings, daily life, café, travel, shopping & family",
    color: "#FF4B4B",
    lessons: [jaLesson1, jaLesson2, jaLesson3, jaLesson4, jaLesson5, jaLesson6],
  },
];

export function getUnitsByLanguage(languageCode: string): Unit[] {
  return units.filter((u) => u.languageCode === languageCode);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((u) => u.id === unitId);
}

export function getLessonById(lessonId: string): import("@/types/learning").Lesson | undefined {
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}
