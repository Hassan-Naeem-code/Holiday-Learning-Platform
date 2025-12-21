import { create } from 'zustand';

interface AICoachState {
  isOpen: boolean;
  toggleCoach: () => void;
  openCoach: () => void;
  closeCoach: () => void;
}

export const useAICoachStore = create<AICoachState>((set) => ({
  isOpen: false,
  toggleCoach: () => set((state) => ({ isOpen: !state.isOpen })),
  openCoach: () => set({ isOpen: true }),
  closeCoach: () => set({ isOpen: false }),
}));
