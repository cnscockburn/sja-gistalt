import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, space, type } from '@/constants/theme';
import type { Level } from '@/types/level';
import type { Scenario } from '@/types/scenario';

interface PrimarySurveyStripProps {
  scenario: Scenario;
  level: Level;
}

interface Item {
  key: string;
  value: string;
}

export function PrimarySurveyStrip({ scenario, level }: PrimarySurveyStripProps) {
  const { shared, er } = scenario.primarySurvey;
  const items: Item[] = [
    { key: 'D', value: shared.danger },
    { key: 'R', value: shared.response },
    { key: 'C', value: shared.catHaem },
    { key: 'A', value: shared.airway },
    { key: 'B', value: shared.breathing },
    { key: 'C', value: shared.circulation },
  ];
  if (level === 'er') {
    items.push({ key: 'D', value: er.disability });
    items.push({ key: 'E', value: er.exposure });
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Primary survey</Text>
      {items.map((item, i) => (
        <View key={`${item.key}-${i}`} style={styles.row}>
          <Text style={styles.key}>{item.key}</Text>
          <Text style={styles.value} numberOfLines={2}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    padding: space.md,
    gap: space.xs,
  },
  heading: {
    ...type.label,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.inkFaint,
    textTransform: 'uppercase',
    marginBottom: space.xs,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space.md },
  key: {
    fontFamily: font.mono,
    fontSize: 13,
    fontWeight: '700',
    color: colors.brand,
    width: 16,
    textAlign: 'center',
  },
  value: { ...type.caption, color: colors.ink, flex: 1 },
});
