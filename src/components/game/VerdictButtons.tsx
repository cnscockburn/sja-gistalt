import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, type } from '@/constants/theme';
import type { Verdict } from '@/types/scenario';

interface VerdictButtonsProps {
  onVerdict: (verdict: Verdict) => void;
}

export function VerdictButtons({ onVerdict }: VerdictButtonsProps) {
  const press = (verdict: Verdict) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onVerdict(verdict);
  };

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Not sick"
        onPress={() => press('not-sick')}
        style={({ pressed }) => [styles.btn, styles.notSick, pressed && styles.pressed]}
      >
        <Ionicons name="arrow-back" size={20} color={colors.notSick} />
        <Text style={[styles.label, { color: colors.notSick }]}>Not sick</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sick"
        onPress={() => press('sick')}
        style={({ pressed }) => [styles.btn, styles.sick, pressed && styles.pressed]}
      >
        <Text style={[styles.label, { color: colors.onSick }]}>Sick</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.onSick} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: space.md },
  btn: {
    flex: 1,
    minHeight: 64,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  notSick: {
    backgroundColor: colors.notSickSoft,
    borderWidth: 2,
    borderColor: colors.notSick,
  },
  sick: { backgroundColor: colors.sick },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  label: { ...type.title, fontSize: 18 },
});
