import { create } from "zustand";

interface TutorialStore {
  isOpen: boolean;
  openTutorial: () => void;
  closeTutorial: () => void;
}

export const useTutorialStore = create<TutorialStore>((set) => ({
  isOpen: false,
  openTutorial: () => set({ isOpen: true }),
  closeTutorial: () => set({ isOpen: false }),
}));
