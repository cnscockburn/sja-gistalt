import type { Level } from './level';
import type { Scenario, Verdict } from './scenario';

export type GameMode = 'normal' | 'swipe-only';
export type StackSize = 10 | 20 | 30;
/** Controls whether the patient card context is hidden (recall challenge) or accessible during follow-up MCQs. */
export type RecallMode = 'hidden' | 'accessible';

export interface AnswerRecord {
  scenarioId: string;
  verdictGiven: Verdict;
  verdictCorrect: boolean;
  followupAnswerIndex?: number;
  followupCorrect?: boolean;
  evolvingAnswerIndex?: number;
  evolvingCorrect?: boolean;
}

export type GameStatus =
  | 'viewing-card'
  | 'followup-mcq'
  | 'evolving-presentation'
  | 'session-complete';

export interface GameSession {
  id: string;
  startedAt: string;
  level: Level;
  mode: GameMode;
  deck: Scenario[];
  currentIndex: number;
  answers: AnswerRecord[];
  status: GameStatus;
  /** Scratch space for the answer being built on the current card. */
  pending: Partial<AnswerRecord> | null;
}

export interface ScenarioScore {
  scenarioId: string;
  title: string;
  earned: number;
  available: number;
  percent: number;
}

export interface SessionScore {
  totalEarned: number;
  totalAvailable: number;
  percent: number;
  breakdown: ScenarioScore[];
}
