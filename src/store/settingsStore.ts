import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Level } from '@/types/level';
import type { GameMode, StackSize } from '@/types/game';

interface SettingsState {
  level: Level;
  hasSeenDisclaimer: boolean;
  gameMode: GameMode;
  stackSize: StackSize;
  /** True once persisted values have loaded, so routing can wait for them. */
  hydrated: boolean;
  setLevel: (level: Level) => void;
  acknowledgeDisclaimer: () => void;
  setGameMode: (mode: GameMode) => void;
  setStackSize: (size: StackSize) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      level: 'cfa',
      hasSeenDisclaimer: false,
      gameMode: 'normal',
      stackSize: 10,
      hydrated: false,
      setLevel: (level) => set({ level }),
      acknowledgeDisclaimer: () => set({ hasSeenDisclaimer: true }),
      setGameMode: (gameMode) => set({ gameMode }),
      setStackSize: (stackSize) => set({ stackSize }),
    }),
    {
      name: '@sja_gestalt/settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ level, hasSeenDisclaimer, gameMode, stackSize }) => ({
        level,
        hasSeenDisclaimer,
        gameMode,
        stackSize,
      }),
      onRehydrateStorage: () => () => {
        useSettings.setState({ hydrated: true });
      },
    }
  )
);
