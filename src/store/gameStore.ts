import { create } from 'zustand';
import type { Level } from '@/types/level';
import type { AnswerRecord, GameMode, GameSession } from '@/types/game';
import { resolveFollowUp, type Scenario, type Verdict } from '@/types/scenario';

interface GameState {
  session: GameSession | null;
  startSession: (deck: Scenario[], level: Level, mode: GameMode) => void;
  resumeSession: (session: GameSession) => void;
  recordVerdict: (verdict: Verdict) => void;
  recordFollowup: (answerIndex: number) => void;
  recordEvolving: (answerIndex: number) => void;
  reset: () => void;
}

const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const currentScenario = (s: GameSession): Scenario | undefined => s.deck[s.currentIndex];

/** Push the in-progress answer into the record set and move to the next card. */
function commitAndAdvance(session: GameSession): GameSession {
  const answers = session.pending
    ? [...session.answers, session.pending as AnswerRecord]
    : session.answers;
  const nextIndex = session.currentIndex + 1;
  const complete = nextIndex >= session.deck.length;
  return {
    ...session,
    answers,
    pending: null,
    currentIndex: complete ? session.currentIndex : nextIndex,
    status: complete ? 'session-complete' : 'viewing-card',
  };
}

export const useGame = create<GameState>((set, get) => ({
  session: null,

  startSession: (deck, level, mode) =>
    set({
      session: {
        id: makeId(),
        startedAt: new Date().toISOString(),
        level,
        mode,
        deck,
        currentIndex: 0,
        answers: [],
        status: 'viewing-card',
        pending: null,
      },
    }),

  resumeSession: (session) => set({ session }),

  recordVerdict: (verdict) => {
    const session = get().session;
    if (!session) return;
    const scenario = currentScenario(session);
    if (!scenario) return;

    const pending: Partial<AnswerRecord> = {
      scenarioId: scenario.id,
      verdictGiven: verdict,
      verdictCorrect: verdict === scenario.correctVerdict,
    };

    const hasFollowup =
      session.mode === 'normal' && !!resolveFollowUp(scenario.followUp, session.level);

    if (hasFollowup) {
      set({ session: { ...session, pending, status: 'followup-mcq' } });
    } else {
      set({ session: commitAndAdvance({ ...session, pending }) });
    }
  },

  recordFollowup: (answerIndex) => {
    const session = get().session;
    if (!session) return;
    const scenario = currentScenario(session);
    if (!scenario) return;

    const question = resolveFollowUp(scenario.followUp, session.level);
    const correct = !!question?.options[answerIndex]?.correct;
    const pending: Partial<AnswerRecord> = {
      ...session.pending,
      followupAnswerIndex: answerIndex,
      followupCorrect: correct,
    };

    const hasEvolving =
      !!scenario.evolvingStage &&
      !!resolveFollowUp(scenario.evolvingStage.followUp, session.level);

    if (hasEvolving) {
      set({ session: { ...session, pending, status: 'evolving-presentation' } });
    } else {
      set({ session: commitAndAdvance({ ...session, pending }) });
    }
  },

  recordEvolving: (answerIndex) => {
    const session = get().session;
    if (!session) return;
    const scenario = currentScenario(session);
    if (!scenario?.evolvingStage) return;

    const question = resolveFollowUp(scenario.evolvingStage.followUp, session.level);
    const correct = !!question?.options[answerIndex]?.correct;
    const pending: Partial<AnswerRecord> = {
      ...session.pending,
      evolvingAnswerIndex: answerIndex,
      evolvingCorrect: correct,
    };
    set({ session: commitAndAdvance({ ...session, pending }) });
  },

  reset: () => set({ session: null }),
}));
