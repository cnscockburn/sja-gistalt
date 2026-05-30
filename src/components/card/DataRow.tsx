import { StyleSheet, Text, View } from 'react-native';
import { colors, font, space, type } from '@/constants/theme';

interface DataRowProps {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}

export function DataRow({ label, value, mono = false, last = false }: DataRowProps) {
  return (
    <View style={[styles.row, last && styles.last]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, mono && styles.mono]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: space.sm,
    gap: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  last: { borderBottomWidth: 0 },
  label: { ...type.caption, color: colors.inkSoft, flex: 1.1 },
  value: { ...type.caption, color: colors.ink, flex: 2, fontWeight: '500' },
  mono: { fontFamily: font.mono },
});
