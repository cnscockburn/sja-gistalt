import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radius, space, type } from '@/constants/theme';
import type { Level } from '@/types/level';
import type { Scenario } from '@/types/scenario';
import { getScenarioImage } from '@/assets/scenarioImages';
import { Disclosure } from '@/components/ui/Disclosure';
import { HeadlineVitals } from './HeadlineVitals';
import { HistoryTable } from './HistoryTable';
import { ObservationsTable } from './ObservationsTable';
import { PrimarySurveyStrip } from './PrimarySurveyStrip';

interface PatientCardProps {
  scenario: Scenario;
  level: Level;
  scrollEnabled?: boolean;
}

export function PatientCard({ scenario, level, scrollEnabled = true }: PatientCardProps) {
  const imageSource = getScenarioImage(scenario.image);

  return (
    <View style={styles.card}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            contentFit="cover"
            transition={150}
            accessibilityIgnoresInvertColors
          />
        ) : null}

        <Text style={styles.setting}>{scenario.setting}</Text>

        <HeadlineVitals scenario={scenario} level={level} />
        <PrimarySurveyStrip scenario={scenario} level={level} />

        <Disclosure title="History & background">
          <HistoryTable scenario={scenario} />
        </Disclosure>
        <Disclosure title="All observations">
          <ObservationsTable scenario={scenario} level={level} />
        </Disclosure>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
    ...elevation.card,
  },
  content: { padding: space.lg, gap: space.lg },
  image: {
    width: '100%',
    height: 180,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
  setting: { ...type.body, color: colors.ink, lineHeight: 22 },
});
