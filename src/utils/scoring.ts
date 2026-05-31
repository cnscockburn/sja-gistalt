import type { Level } from '@/types/level';
import type { AnswerRecord, GameMode, ScenarioScore, SessionScore } from '@/types/game';
import { resolveFollowUp, type Scenario } from '@/types/scenario';

const pct = (earned: number, available: number) =>
  available === 0 ? 0 : Math.round((earned / available) * 100);

/**
 * Returns the total marks available for a scenario without needing an AnswerRecord.
 * Use this to show the per-scenario marks budget before the user has answered.
 *  - verdict: always 1
 *  - follow-up: +1 if normal mode and a follow-up resolves for this level
 *  - evolving: +1 if normal mode and an evolving follow-up resolves for this level
 */
export function availableMarksForScenario(
  scenario: Scenario,
  mode: GameMode,
  level: Level
): number {
  if (mode !== 'normal') return 1;
  return (
    1 +
    (resolveFollowUp(scenario.followUp, level) ? 1 : 0) +
    (scenario.evolvingStage && resolveFollowUp(scenario.evolvingStage.followUp, level) ? 1 : 0)
  );
}

/**
 * Marks available for a scenario depend on mode and level:
 *  - verdict: always 1
 *  - follow-up: +1 if normal mode and a follow-up resolves for this level
 *  - evolving: +1 if normal mode and an evolving follow-up resolves for this level
 */
export function scoreScenario(
  scenario: Scenario,
  answer: AnswerRecord,
  mode: GameMode,
  level: Level
): ScenarioScore {
  let available = 1;
  let earned = answer.verdictCorrect ? 1 : 0;

  if (mode === 'normal') {
    if (resolveFollowUp(scenario.followUp, level)) {
      available += 1;
      if (answer.followupCorrect) earned += 1;
    }
    if (scenario.evolvingStage && resolveFollowUp(scenario.evolvingStage.followUp, level)) {
      available += 1;
      if (answer.evolvingCorrect) earned += 1;
    }
  }

  return {
    scenarioId: scenario.id,
    title: scenario.title,
    earned,
    available,
    percent: pct(earned, available),
  };
}

export function scoreSession(
  deck: readonly Scenario[],
  answers: readonly AnswerRecord[],
  mode: GameMode,
  level: Level
): SessionScore {
  const byId = new Map(deck.map((s) => [s.id, s]));
  const breakdown: ScenarioScore[] = [];

  for (const answer of answers) {
    const scenario = byId.get(answer.scenarioId);
    if (!scenario) continue;
    breakdown.push(scoreScenario(scenario, answer, mode, level));
  }

  const totalEarned = breakdown.reduce((sum, s) => sum + s.earned, 0);
  const totalAvailable = breakdown.reduce((sum, s) => sum + s.available, 0);

  return {
    totalEarned,
    totalAvailable,
    percent: pct(totalEarned, totalAvailable),
    breakdown,
  };
}
