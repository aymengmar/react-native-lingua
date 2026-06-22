import type { Unit } from "@/types/learning";
import { esLesson1, esLesson2, frLesson1, jaLesson1 } from "@/data/lessons";

export const units: Unit[] = [
  // --- Spanish ---
  {
    id: "es-unit-1",
    languageCode: "es",
    order: 1,
    title: "Basics 1",
    description: "Greetings, numbers, and essentials",
    color: "#58CC02",
    lessons: [esLesson1, esLesson2],
  },

  // --- French ---
  {
    id: "fr-unit-1",
    languageCode: "fr",
    order: 1,
    title: "Basics 1",
    description: "Greetings and introductions",
    color: "#1CB0F6",
    lessons: [frLesson1],
  },

  // --- Japanese ---
  {
    id: "ja-unit-1",
    languageCode: "ja",
    order: 1,
    title: "Basics 1",
    description: "First words and greetings",
    color: "#FF4B4B",
    lessons: [jaLesson1],
  },
];

export function getUnitsByLanguage(languageCode: string): Unit[] {
  return units.filter((u) => u.languageCode === languageCode);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((u) => u.id === unitId);
}
