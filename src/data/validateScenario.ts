import type { Level } from '@/types/level';
import {
  resolveFollowUp,
  type FollowUpQuestion,
  type LevelAwareFollowUp,
  type Scenario,
} from '@/types/scenario';

export interface ValidationIssue {
  scenarioId: string;
  level: 'error' | 'warning';
  message: string;
}

const SETTING_MAX = 200;

function checkQuestion(
  id: string,
  q: FollowUpQuestion,
  where: string,
  issues: ValidationIssue[]
) {
  if (q.options.length !== 4) {
    issues.push({
      scenarioId: id,
      level: 'error',
      message: `${where}: expected exactly 4 options, found ${q.options.length}`,
    });
  }
  const correctCount = q.options.filter((o) => o.correct).length;
  if (correctCount !== 1) {
    issues.push({
      scenarioId: id,
      level: 'error',
      message: `${where}: expected exactly 1 correct option, found ${correctCount}`,
    });
  }
}

function eachResolvedQuestion(
  fu: LevelAwareFollowUp,
  fn: (q: FollowUpQuestion, level: Level) => void
) {
  (['cfa', 'er'] as Level[]).forEach((lvl) => {
    const q = resolveFollowUp(fu, lvl);
    if (q) fn(q, lvl);
  });
}

export function validateScenario(s: Scenario): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const err = (message: string) =>
    issues.push({ scenarioId: s.id, level: 'error', message });
  const warn = (message: string) =>
    issues.push({ scenarioId: s.id, level: 'warning', message });

  if (!s.levelFlags.availableTo.length) err('availableTo is empty');
  if (s.setting.length > SETTING_MAX)
    warn(`setting is ${s.setting.length} chars (max ${SETTING_MAX})`);
  if (!s.guidelineReference) warn('missing guidelineReference');
  if (!s.version) warn('missing version');

  if (s.levelFlags.availableTo.includes('cfa') && !s.observations.cfa)
    err('available to CFA but observations.cfa missing');
  if (s.levelFlags.availableTo.includes('er') && !s.observations.er)
    err('available to ER but observations.er missing');

  if (s.followUp) {
    eachResolvedQuestion(s.followUp, (q, lvl) =>
      checkQuestion(s.id, q, `followUp[${lvl}]`, issues)
    );
  }
  if (s.evolvingStage) {
    eachResolvedQuestion(s.evolvingStage.followUp, (q, lvl) =>
      checkQuestion(s.id, q, `evolvingStage.followUp[${lvl}]`, issues)
    );
  }

  return issues;
}

export function validateAll(scenarios: readonly Scenario[]): ValidationIssue[] {
  const all = scenarios.flatMap(validateScenario);
  const ids = scenarios.map((s) => s.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  for (const id of new Set(dupes)) {
    all.push({ scenarioId: id, level: 'error', message: 'duplicate scenario id' });
  }
  return all;
}
