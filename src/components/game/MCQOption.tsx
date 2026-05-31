import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, type } from '@/constants/theme';

export type MCQOptionState = 'idle' | 'selectedCorrect' | 'selectedWrong' | 'revealCorrect';

interface MCQOptionProps {
  index: number;
  text: string;
  state: MCQOptionState;
  disabled: boolean;
  onPress: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function MCQOption({ index, text, state, disabled, onPress }: MCQOptionProps) {
  const showCorrect = state === 'selectedCorrect' || state === 'revealCorrect';
  const showWrong = state === 'selectedWrong';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        showCorrect && styles.correct,
        showWrong && styles.wrong,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.badge,
          showCorrect && styles.badgeCorrect,
          showWrong && styles.badgeWrong,
        ]}
      >
        {showCorrect ? (
          <Ionicons name="checkmark" size={16} color={colors.onBrand} />
        ) : showWrong ? (
          <Ionicons name="close" size={16} color={colors.onSick} />
        ) : (
          <Text style={styles.letter}>{LETTERS[index]}</Text>
        )}
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: space.lg,
    minHeight: 60,
  },
  correct: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  wrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
  pressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
  badge: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCorrect: { backgroundColor: colors.correct },
  badgeWrong: { backgroundColor: colors.wrong },
  letter: { ...type.label, color: colors.inkSoft },
  text: { ...type.body, color: colors.ink, flex: 1, lineHeight: 21 },
});
