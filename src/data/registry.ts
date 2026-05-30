import type { Scenario } from '@/types/scenario';
import { validateAll } from './validateScenario';

// Static imports so Metro bundles the JSON. When a CMS/API is added in a later
// phase, only this file changes; the rest of the app calls getScenarios().
import sja001 from './scenarios/sja-001.json';
import sja004 from './scenarios/sja-004.json';
import sja005 from './scenarios/sja-005.json';
import sja006 from './scenarios/sja-006.json';
import sja008 from './scenarios/sja-008.json';
import sja010 from './scenarios/sja-010.json';
import sja012 from './scenarios/sja-012.json';

const ALL = [
  sja001,
  sja004,
  sja005,
  sja006,
  sja008,
  sja010,
  sja012,
] as unknown as Scenario[];

let validated = false;

/**
 * Single source of truth for scenario content. Async by design so a future
 * remote source can drop in without touching callers.
 */
export async function getScenarios(): Promise<Scenario[]> {
  if (__DEV__ && !validated) {
    validated = true;
    const issues = validateAll(ALL);
    for (const issue of issues) {
      const line = `[scenario:${issue.scenarioId}] ${issue.message}`;
      if (issue.level === 'error') console.error(line);
      else console.warn(line);
    }
  }
  return ALL;
}
