import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameSession } from '@/types/game';

const ACTIVE_SESSION_KEY = '@sja_gestalt/active_session';

export async function saveActiveSession(session: GameSession): Promise<void> {
  try {
    await AsyncStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  } catch {
    // Non-fatal: persistence is best-effort.
  }
}

export async function loadActiveSession(): Promise<GameSession | null> {
  try {
    const raw = await AsyncStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameSession;
    if (!parsed || parsed.status === 'session-complete') return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function clearActiveSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch {
    // Non-fatal.
  }
}
