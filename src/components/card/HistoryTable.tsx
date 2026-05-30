import { View } from 'react-native';
import type { Scenario } from '@/types/scenario';
import { DataRow } from './DataRow';

export function HistoryTable({ scenario }: { scenario: Scenario }) {
  const h = scenario.history;
  const rows: { label: string; value: string }[] = [
    { label: 'Complaint', value: h.complaint },
    { label: 'History', value: h.history },
    { label: 'Past medical', value: h.pmh },
    { label: 'Drugs / allergies', value: h.drugs },
    { label: 'Injuries / illness', value: h.injuries },
    { label: 'Additional', value: h.additional },
  ];
  return (
    <View>
      {rows.map((r, i) => (
        <DataRow key={r.label} label={r.label} value={r.value} last={i === rows.length - 1} />
      ))}
    </View>
  );
}
