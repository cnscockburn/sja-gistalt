import type { Level } from '@/types/level';
import type { Scenario } from '@/types/scenario';

/** Keep only scenarios available to the given clinical level. */
export function filterByLevel(scenarios: readonly Scenario[], level: Level): Scenario[] {
  return scenarios.filter((s) => s.levelFlags.availableTo.includes(level));
}
