import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Level } from '@/types/level';
import type { GameMode, RecallMode, StackSize } from '@/types/game';

interface SettingsState {
  level: Level;
  hasSeenDisclaimer: boolean;
  gameMode: GameMode;
  stackSize: StackSize;
  /**
   * 'hidden'     — patient card disappears after swipe (tests recall; default)
   * 'accessible' — a "Review case" panel is available during follow-up MCQs
   */
  recallMode: RecallMode;
  /** True once persisted values have loaded, so routing can wait for them. */
  hydrated: boolean;
  setLevel: (level: Level) => void;
  acknowledgeDisclaimer: () => void;
  setGameMode: (mode: GameMode) => void;
  setStackSize: (size: StackSize) => void;
  setRecallMode: (mode: RecallMode) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      level: 'cfa',
      hasSeenDisclaimer: false,
      gameMode: 'normal',
      stackSize: 10,
      recallMode: 'hidden',
      hydrated: false,
      setLevel: (level) => set({ level }),
      acknowledgeDisclaimer: () => set({ hasSeenDisclaimer: true }),
      setGameMode: (gameMode) => set({ gameMode }),
      setStackSize: (stackSize) => set({ stackSize }),
      setRecallMode: (recallMode) => set({ recallMode }),
    }),
    {
      name: '@sja_gestalt/settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ level, hasSeenDisclaimer, gameMode, stackSize, recallMode }) => ({
        level,
        hasSeenDisclaimer,
        gameMode,
        stackSize,
        recallMode,
      }),
      onRehydrateStorage: () => () => {
        useSettings.setState({ hydrated: true });
      },
    }
  )
);
