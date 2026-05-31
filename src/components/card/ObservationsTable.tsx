import { View } from 'react-native';
import type { Level } from '@/types/level';
import type { Scenario } from '@/types/scenario';
import { DataRow } from './DataRow';

interface ObservationsTableProps {
  scenario: Scenario;
  level: Level;
}

export function ObservationsTable({ scenario, level }: ObservationsTableProps) {
  const { shared, cfa, er } = scenario.observations;
  const rows: { label: string; value: string }[] = [
    { label: 'FAST test', value: shared.fastTest },
    level === 'er' ? { label: 'ACVPU', value: er.acvpu } : { label: 'AVPU', value: cfa.avpu },
    { label: 'Resp rate', value: shared.respirationRate },
    { label: 'Pulse rate', value: shared.pulseRate },
    { label: 'Pain score', value: shared.painScore },
    { label: 'Temperature', value: shared.temperature },
  ];
  if (level === 'er') {
    rows.push(
      { label: 'Pupils', value: er.pupilSize },
      { label: 'SpO2', value: er.pulseOximetry },
      { label: 'Blood glucose', value: er.bloodGlucose },
      { label: 'Blood pressure', value: er.bloodPressure }
    );
  }

  return (
    <View>
      {rows.map((r, i) => (
        <DataRow
          key={r.label}
          label={r.label}
          value={r.value}
          mono
          last={i === rows.length - 1}
        />
      ))}
    </View>
  );
}
