/**
 * Content validation gate. Loads every scenario JSON and runs the shared
 * validator. Exits non-zero on any error so CI fails fast on bad content.
 *
 * Run: npm run validate:content
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateAll } from '../src/data/validateScenario';
import type { Scenario } from '../src/types/scenario';

const SCENARIO_DIR = join(__dirname, '..', 'src', 'data', 'scenarios');

function loadScenarios(): Scenario[] {
  const files = readdirSync(SCENARIO_DIR).filter((f) => f.endsWith('.json'));
  if (files.length === 0) {
    console.error('No scenario JSON files found in', SCENARIO_DIR);
    process.exit(1);
  }
  return files.map((file) => {
    const raw = readFileSync(join(SCENARIO_DIR, file), 'utf8');
    try {
      return JSON.parse(raw) as Scenario;
    } catch (err) {
      console.error(`Invalid JSON in ${file}: ${(err as Error).message}`);
      process.exit(1);
    }
  });
}

function main() {
  const scenarios = loadScenarios();
  const issues = validateAll(scenarios);

  const errors = issues.filter((i) => i.level === 'error');
  const warnings = issues.filter((i) => i.level === 'warning');

  for (const issue of issues) {
    const tag = issue.level === 'error' ? 'ERROR' : 'warn ';
    console.log(`[${tag}] ${issue.scenarioId}: ${issue.message}`);
  }

  console.log(
    `\nValidated ${scenarios.length} scenario(s): ${errors.length} error(s), ${warnings.length} warning(s).`
  );

  if (errors.length > 0) process.exit(1);
}

main();
