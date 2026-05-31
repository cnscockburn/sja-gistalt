import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, type } from '@/constants/theme';
import type { Level } from '@/types/level';
import type { AnswerRecord, GameMode } from '@/types/game';
import { resolveFollowUp, type Scenario, type Verdict } from '@/types/scenario';
import { scoreScenario } from '@/utils/scoring';

interface Props {
  scenario: Scenario;
  answer: AnswerRecord;
  level: Level;
  mode: GameMode;
}

const verdictLabel = (v: Verdict) => (v === 'sick' ? 'Sick' : 'Not sick');

function Mark({ correct }: { correct: boolean }) {
  return (
    <View style={[styles.mark, { backgroundColor: correct ? colors.correct : colors.wrong }]}>
      <Ionicons name={correct ? 'checkmark' : 'close'} size={14} color={colors.onBrand} />
    </View>
  );
}

export function ScenarioResultCard({ scenario, answer, level, mode }: Props) {
  const followUp = resolveFollowUp(scenario.followUp, level);
  const evolving = scenario.evolvingStage
    ? resolveFollowUp(scenario.evolvingStage.followUp, level)
    : undefined;
  const showFollowUp = mode === 'normal' && !!followUp;
  const showEvolving = mode === 'normal' && !!evolving;
  const notes = level === 'cfa' ? scenario.levelFlags.cfaNotes : scenario.levelFlags.erNotes;

  const { earned, available } = scoreScenario(scenario, answer, mode, level);
  const cardTint =
    earned === available ? styles.cardCorrect : earned === 0 ? styles.cardWrong : null;

  return (
    <View style={[styles.card, cardTint]}>
      <Text style={styles.title}>{scenario.title}</Text>

      <View style={styles.line}>
        <Mark correct={answer.verdictCorrect} />
        <Text style={styles.lineText}>
          You said {verdictLabel(answer.verdictGiven)}
          {answer.verdictCorrect
            ? ''
            : `  ·  correct: ${verdictLabel(scenario.correctVerdict)}`}
        </Text>
      </View>
      <Text style={styles.explain}>{scenario.verdictExplanation}</Text>

      {showFollowUp && (
        <View style={styles.sub}>
          <View style={styles.line}>
            <Mark correct={!!answer.followupCorrect} />
            <Text style={styles.lineText}>Management</Text>
          </View>
          <Text style={styles.explain}>{followUp!.explanation}</Text>
        </View>
      )}

      {showEvolving && (
        <View style={styles.sub}>
          <View style={styles.line}>
            <Mark correct={!!answer.evolvingCorrect} />
            <Text style={styles.lineText}>Evolving presentation</Text>
          </View>
          <Text style={styles.explain}>{evolving!.explanation}</Text>
        </View>
      )}

      {notes ? <Text style={styles.notes}>{notes}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.sm,
  },
  cardCorrect: {
    backgroundColor: colors.correctSoft,
    borderColor: colors.correct,
  },
  cardWrong: {
    backgroundColor: colors.wrongSoft,
    borderColor: colors.wrong,
  },
  title: { ...type.title, color: colors.ink, marginBottom: space.xs },
  line: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  lineText: { ...type.label, color: colors.ink, flex: 1 },
  explain: { ...type.caption, color: colors.inkSoft, lineHeight: 20 },
  sub: { gap: space.xs, marginTop: space.xs },
  notes: {
    ...type.caption,
    color: colors.brandDark,
    fontStyle: 'italic',
    marginTop: space.xs,
  },
  mark: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
