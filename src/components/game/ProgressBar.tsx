import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, space } from '@/constants/theme';

interface ProgressBarProps {
  current: number; // 1-based
  total: number;
  /** Available marks for the current scenario. When provided, shown as "·  Xpt" after the count. */
  availableMarks?: number;
}

export function ProgressBar({ current, total, availableMarks }: ProgressBarProps) {
  const ratio = total === 0 ? 0 : Math.min(current / total, 1);
  return (
    <View style={styles.wrap}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
      <Text style={styles.count}>
        {current}/{total}
        {availableMarks != null && (
          <Text style={styles.marks}>{`  ·  ${availableMarks}pt`}</Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  track: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.line,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: colors.brand, borderRadius: radius.pill },
  count: { fontFamily: font.mono, fontSize: 13, color: colors.inkSoft },
  marks: { fontFamily: font.mono, fontSize: 12, color: colors.inkFaint },
});
