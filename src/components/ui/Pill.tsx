import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, space, type } from '@/constants/theme';

interface PillProps {
  label: string;
  tone?: 'brand' | 'neutral' | 'warn';
}

export function Pill({ label, tone = 'neutral' }: PillProps) {
  return (
    <View style={[styles.base, TONE[tone].box]}>
      <Text style={[styles.label, TONE[tone].text]}>{label}</Text>
    </View>
  );
}

const TONE = {
  brand: {
    box: { backgroundColor: colors.brandSoft },
    text: { color: colors.brandDark },
  },
  neutral: {
    box: { backgroundColor: colors.line },
    text: { color: colors.inkSoft },
  },
  warn: {
    box: { backgroundColor: colors.amberNote },
    text: { color: '#8A6312' },
  },
} as const;

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radius.pill,
  },
  label: { ...type.label, fontSize: 12 },
});
