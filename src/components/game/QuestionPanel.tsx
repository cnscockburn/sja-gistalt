import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, space, type } from '@/constants/theme';
import type { Level } from '@/types/level';
import type { FollowUpQuestion } from '@/types/scenario';
import { Button } from '@/components/ui/Button';
import { MCQOption, type MCQOptionState } from './MCQOption';

interface QuestionPanelProps {
  question: FollowUpQuestion;
  level: Level;
  onComplete: (answerIndex: number) => void;
  continueLabel?: string;
}

export function QuestionPanel({
  question,
  level,
  onComplete,
  continueLabel = 'Continue',
}: QuestionPanelProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  const select = (i: number) => {
    if (answered) return;
    setSelected(i);
    void Haptics.notificationAsync(
      question.options[i].correct
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning
    );
  };

  const stateFor = (i: number): MCQOptionState => {
    if (selected === null) return 'idle';
    if (i === selected) {
      return question.options[i].correct ? 'selectedCorrect' : 'selectedWrong';
    }
    const pickedWrong = !question.options[selected].correct;
    if (pickedWrong && question.options[i].correct) return 'revealCorrect';
    return 'idle';
  };

  const levelNote = question.levelExplanation?.[level];

  return (
    <View style={styles.wrap}>
      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.options}>
        {question.options.map((opt, i) => (
          <MCQOption
            key={i}
            index={i}
            text={opt.text}
            state={stateFor(i)}
            disabled={answered}
            onPress={() => select(i)}
          />
        ))}
      </View>

      {answered && (
        <View style={styles.explain}>
          <Text style={styles.explainLabel}>Why</Text>
          <Text style={styles.explainText}>{question.explanation}</Text>
          {levelNote ? <Text style={styles.levelNote}>{levelNote}</Text> : null}
        </View>
      )}

      {answered && <Button label={continueLabel} onPress={() => onComplete(selected)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.lg },
  question: { ...type.h2, color: colors.ink, lineHeight: 27 },
  options: { gap: space.md },
  explain: {
    backgroundColor: colors.brandSoft,
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.sm,
  },
  explainLabel: {
    ...type.label,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.brandDark,
  },
  explainText: { ...type.body, color: colors.ink, lineHeight: 22 },
  levelNote: {
    ...type.body,
    color: colors.brandDark,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
