import type { Scenario } from '@/types/scenario';
import { validateAll } from './validateScenario';

// Static imports so Metro bundles the JSON. When a CMS/API is added in a later
// phase, only this file changes; the rest of the app calls getScenarios().
import sja001 from './scenarios/sja-001.json';
import sja002 from './scenarios/sja-002.json';
import sja003 from './scenarios/sja-003.json';
import sja004 from './scenarios/sja-004.json';
import sja005 from './scenarios/sja-005.json';
import sja006 from './scenarios/sja-006.json';
import sja007 from './scenarios/sja-007.json';
import sja008 from './scenarios/sja-008.json';
import sja009 from './scenarios/sja-009.json';
import sja010 from './scenarios/sja-010.json';
import sja011 from './scenarios/sja-011.json';
import sja012 from './scenarios/sja-012.json';
import sja013 from './scenarios/sja-013.json';
import sja014 from './scenarios/sja-014.json';
import sja015 from './scenarios/sja-015.json';
import sja016 from './scenarios/sja-016.json';
import sja017 from './scenarios/sja-017.json';
import sja018 from './scenarios/sja-018.json';
import sja019 from './scenarios/sja-019.json';
import sja020 from './scenarios/sja-020.json';
import sja021 from './scenarios/sja-021.json';
import sja022 from './scenarios/sja-022.json';
import sja023 from './scenarios/sja-023.json';
import sja024 from './scenarios/sja-024.json';
import sja025 from './scenarios/sja-025.json';
import sja026 from './scenarios/sja-026.json';
import sja027 from './scenarios/sja-027.json';
import sja028 from './scenarios/sja-028.json';
import sja029 from './scenarios/sja-029.json';
import sja030 from './scenarios/sja-030.json';
import sja031 from './scenarios/sja-031.json';
import sja032 from './scenarios/sja-032.json';
import sja033 from './scenarios/sja-033.json';
import sja034 from './scenarios/sja-034.json';
import sja035 from './scenarios/sja-035.json';
import sja036 from './scenarios/sja-036.json';
import sja037 from './scenarios/sja-037.json';
import sja038 from './scenarios/sja-038.json';
import sja039 from './scenarios/sja-039.json';
import sja040 from './scenarios/sja-040.json';
import sja041 from './scenarios/sja-041.json';
import sja042 from './scenarios/sja-042.json';
import sja043 from './scenarios/sja-043.json';
import sja044 from './scenarios/sja-044.json';
import sja045 from './scenarios/sja-045.json';
import sja046 from './scenarios/sja-046.json';
import sja047 from './scenarios/sja-047.json';
import sja048 from './scenarios/sja-048.json';
import sja049 from './scenarios/sja-049.json';
import sja050 from './scenarios/sja-050.json';
import sja051 from './scenarios/sja-051.json';
import sja052 from './scenarios/sja-052.json';
import sja053 from './scenarios/sja-053.json';
import sja054 from './scenarios/sja-054.json';
import sja055 from './scenarios/sja-055.json';
import sja056 from './scenarios/sja-056.json';
import sja057 from './scenarios/sja-057.json';
import sja058 from './scenarios/sja-058.json';
import sja059 from './scenarios/sja-059.json';
import sja060 from './scenarios/sja-060.json';

const ALL = [
  sja001,
  sja002,
  sja003,
  sja004,
  sja005,
  sja006,
  sja007,
  sja008,
  sja009,
  sja010,
  sja011,
  sja012,
  sja013,
  sja014,
  sja015,
  sja016,
  sja017,
  sja018,
  sja019,
  sja020,
  sja021,
  sja022,
  sja023,
  sja024,
  sja025,
  sja026,
  sja027,
  sja028,
  sja029,
  sja030,
  sja031,
  sja032,
  sja033,
  sja034,
  sja035,
  sja036,
  sja037,
  sja038,
  sja039,
  sja040,
  sja041,
  sja042,
  sja043,
  sja044,
  sja045,
  sja046,
  sja047,
  sja048,
  sja049,
  sja050,
  sja051,
  sja052,
  sja053,
  sja054,
  sja055,
  sja056,
  sja057,
  sja058,
  sja059,
  sja060,
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
