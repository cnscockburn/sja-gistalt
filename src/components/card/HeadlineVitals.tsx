import { StyleSheet, View } from 'react-native';
import { space } from '@/constants/theme';
import type { Level } from '@/types/level';
import type { Scenario } from '@/types/scenario';
import { VitalTile } from './VitalTile';

interface HeadlineVitalsProps {
  scenario: Scenario;
  level: Level;
}

export function HeadlineVitals({ scenario, level }: HeadlineVitalsProps) {
  const { shared, cfa, er } = scenario.observations;
  const consciousness =
    level === 'er' ? { label: 'ACVPU', value: er.acvpu } : { label: 'AVPU', value: cfa.avpu };

  return (
    <View style={styles.grid}>
      <VitalTile label={consciousness.label} value={consciousness.value} />
      <VitalTile label="Resp rate" value={shared.respirationRate} />
      <VitalTile label="Pulse" value={shared.pulseRate} />
      {level === 'er' && <VitalTile label="SpO2" value={er.pulseOximetry} />}
      {level === 'er' && <VitalTile label="BP" value={er.bloodPressure} />}
      <VitalTile label="Pain" value={shared.painScore} />
      <VitalTile label="Temp" value={shared.temperature} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
  },
});
