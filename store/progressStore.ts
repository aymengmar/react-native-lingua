import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  currentXp: number;
  dailyGoalXp: number;
  streak: number;
  completedLessons: string[];
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  resetDailyXp: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      currentXp: 15,
      dailyGoalXp: 20,
      streak: 12,
      completedLessons: [],
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      addXp: (amount) =>
        set((state) => ({ currentXp: state.currentXp + amount })),
      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),
      resetDailyXp: () => set({ currentXp: 0 }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
