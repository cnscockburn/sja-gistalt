import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, space, type } from '@/constants/theme';
import type { SessionScore } from '@/types/game';

function band(percent: number): string {
  if (percent >= 90) return 'Excellent gestalt';
  if (percent >= 75) return 'Strong';
  if (percent >= 50) return 'Solid, keep sharpening';
  return 'Keep practising';
}

export function ScoreHeader({ score }: { score: SessionScore }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.band}>{band(score.percent)}</Text>
      <Text style={styles.percent}>{score.percent}%</Text>
      <Text style={styles.fraction}>
        {score.totalEarned} of {score.totalAvailable} available marks
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${score.percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm, paddingVertical: space.lg },
  band: {
    ...type.label,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.brandDark,
  },
  percent: { fontFamily: font.mono, fontSize: 56, fontWeight: '700', color: colors.ink },
  fraction: { ...type.body, color: colors.inkSoft },
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.line,
    overflow: 'hidden',
    marginTop: space.sm,
  },
  fill: { height: '100%', backgroundColor: colors.brand, borderRadius: radius.pill },
});
