import type { Level } from './level';

export type Verdict = 'sick' | 'not-sick';

export interface ObservationsShared {
  fastTest: string;
  respirationRate: string;
  pulseRate: string;
  painScore: string;
  temperature: string;
}

export interface ObservationsCFA {
  avpu: string;
}

export interface ObservationsER {
  acvpu: string;
  pupilSize: string;
  pulseOximetry: string;
  bloodGlucose: string;
  bloodPressure: string;
}

export interface PrimarySurveyShared {
  danger: string;
  response: string;
  catHaem: string;
  airway: string;
  breathing: string;
  circulation: string;
}

export interface PrimarySurveyER {
  disability: string;
  exposure: string;
}

export interface MCQOption {
  text: string;
  correct: boolean;
}

export interface FollowUpQuestion {
  question: string;
  options: MCQOption[]; // exactly 4, exactly one correct (enforced by validator)
  explanation: string;
  levelExplanation?: Partial<Record<Level, string>>;
}

/** A follow-up can be shared across levels, or split per level. */
export type LevelAwareFollowUp =
  | FollowUpQuestion
  | { cfa: FollowUpQuestion; er: FollowUpQuestion };

export interface EvolvingStage {
  narrative: string;
  updatedObservations?: Partial<
    ObservationsShared & ObservationsCFA & ObservationsER
  >;
  followUp: LevelAwareFollowUp;
}

export interface History {
  complaint: string;
  history: string;
  pmh: string;
  drugs: string;
  injuries: string;
  additional: string;
}

export interface Scenario {
  id: string;
  version: string;
  guidelineReference: string;
  title: string;
  setting: string; // max ~200 chars, enforced by validator
  image?: string;

  correctVerdict: Verdict;
  verdictExplanation: string;

  observations: {
    shared: ObservationsShared;
    cfa: ObservationsCFA;
    er: ObservationsER;
  };

  primarySurvey: {
    shared: PrimarySurveyShared;
    er: PrimarySurveyER;
  };

  history: History;

  followUp?: LevelAwareFollowUp;
  evolvingStage?: EvolvingStage;

  levelFlags: {
    availableTo: Level[];
    cfaNotes?: string;
    erNotes?: string;
  };
}

/** Resolve a possibly level-split follow-up down to the active level. */
export function resolveFollowUp(
  fu: LevelAwareFollowUp | undefined,
  level: Level
): FollowUpQuestion | undefined {
  if (!fu) return undefined;
  if ('question' in fu) return fu;
  return fu[level];
}
