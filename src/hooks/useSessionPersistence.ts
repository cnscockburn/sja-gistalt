import { useEffect } from 'react';
import { useGame } from '@/store/gameStore';
import { clearActiveSession, saveActiveSession } from '@/utils/sessionStorage';

/**
 * Mount once at the root. Mirrors the active game session into AsyncStorage so
 * an interrupted session (phone call, app killed) can be resumed on relaunch.
 */
export function useSessionPersistence() {
  useEffect(() => {
    return useGame.subscribe((state) => {
      const session = state.session;
      if (session && session.status !== 'session-complete') {
        void saveActiveSession(session);
      } else {
        void clearActiveSession();
      }
    });
  }, []);
}
