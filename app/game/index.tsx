import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, type } from '@/constants/theme';
import type { Level } from '@/types/level';
import { LEVEL_SHORT } from '@/types/level';
import { resolveFollowUp } from '@/types/scenario';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/game/ProgressBar';
import { SwipeableCard } from '@/components/game/SwipeableCard';
import { VerdictButtons } from '@/components/game/VerdictButtons';
import { QuestionPanel } from '@/components/game/QuestionPanel';
import { DataRow } from '@/components/card/DataRow';
import { useGame } from '@/store/gameStore';
import { useSettings } from '@/store/settingsStore';

const OBS_LABELS: Record<string, string> = {
  fastTest: 'FAST test',
  avpu: 'AVPU',
  acvpu: 'ACVPU',
  respirationRate: 'Resp rate',
  pulseRate: 'Pulse rate',
  painScore: 'Pain score',
  temperature: 'Temperature',
  pupilSize: 'Pupils',
  pulseOximetry: 'SpO2',
  bloodGlucose: 'Blood glucose',
  bloodPressure: 'Blood pressure',
};

const CFA_KEYS = [
  'fastTest',
  'avpu',
  'respirationRate',
  'pulseRate',
  'painScore',
  'temperature',
];
const ER_KEYS = [
  'fastTest',
  'acvpu',
  'respirationRate',
  'pulseRate',
  'painScore',
  'temperature',
  'pupilSize',
  'pulseOximetry',
  'bloodGlucose',
  'bloodPressure',
];

function UpdatedObs({ obs, level }: { obs: Record<string, string>; level: Level }) {
  const allowed = level === 'er' ? ER_KEYS : CFA_KEYS;
  const entries = allowed.filter((k) => obs[k] != null).map((k) => [k, obs[k]] as const);
  if (entries.length === 0) return null;
  return (
    <View style={styles.obsBox}>
      <Text style={styles.obsTitle}>Updated observations</Text>
      {entries.map(([k, v], i) => (
        <DataRow
          key={k}
          label={OBS_LABELS[k] ?? k}
          value={v}
          mono
          last={i === entries.length - 1}
        />
      ))}
    </View>
  );
}

export default function GameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const session = useGame((s) => s.session);
  const recordVerdict = useGame((s) => s.recordVerdict);
  const recordFollowup = useGame((s) => s.recordFollowup);
  const recordEvolving = useGame((s) => s.recordEvolving);
  const reset = useGame((s) => s.reset);
  const recallMode = useSettings((s) => s.recallMode);

  const status = session?.status;

  useEffect(() => {
    if (!session) router.replace('/(tabs)');
  }, [session, router]);

  useEffect(() => {
    if (status === 'session-complete') router.replace('/game/results');
  }, [status, router]);

  if (!session) return null;
  const scenario = session.deck[session.currentIndex];
  if (!scenario) return null;

  const { level } = session;
  const isLast = session.currentIndex === session.deck.length - 1;

  const leave = () => {
    Alert.alert('Leave session?', 'Your progress will be lost.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Leave',
        style: 'destructive',
        onPress: () => {
          reset();
          router.replace('/(tabs)');
        },
      },
    ]);
  };

  const followUp = resolveFollowUp(scenario.followUp, level);
  const evolvingQuestion = scenario.evolvingStage
    ? resolveFollowUp(scenario.evolvingStage.followUp, level)
    : undefined;
  const hasEvolving = !!evolvingQuestion;

  const followupContinue = hasEvolving ? 'Continue' : isLast ? 'See results' : 'Next patient';
  const evolvingContinue = isLast ? 'See results' : 'Next patient';

  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.sm }]}>
      <View style={styles.header}>
        <Pressable hitSlop={12} onPress={leave} accessibilityLabel="Leave session">
          <Ionicons name="chevron-back" size={26} color={colors.ink} />
        </Pressable>
        <ProgressBar current={session.currentIndex + 1} total={session.deck.length} />
        <Pill label={LEVEL_SHORT[level]} tone="brand" />
      </View>

      {status === 'viewing-card' && (
        <View style={styles.body}>
          <View style={styles.cardArea}>
            <SwipeableCard
              key={scenario.id}
              scenario={scenario}
              level={level}
              onVerdict={recordVerdict}
            />
          </View>
          <VerdictButtons onVerdict={recordVerdict} />
        </View>
      )}

      {status === 'followup-mcq' && followUp && (
        <ScrollView
          contentContainerStyle={styles.qContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.phaseLabel}>Follow-up</Text>
          <QuestionPanel
            question={followUp}
            level={level}
            onComplete={recordFollowup}
            continueLabel={followupContinue}
            scenario={scenario}
            recallMode={recallMode}
          />
        </ScrollView>
      )}

      {status === 'evolving-presentation' && scenario.evolvingStage && evolvingQuestion && (
        <ScrollView
          contentContainerStyle={styles.qContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.phaseLabel}>The picture changes</Text>
          <Text style={styles.narrative}>{scenario.evolvingStage.narrative}</Text>
          {scenario.evolvingStage.updatedObservations ? (
            <UpdatedObs
              obs={scenario.evolvingStage.updatedObservations as Record<string, string>}
              level={level}
            />
          ) : null}
          <QuestionPanel
            question={evolvingQuestion}
            level={level}
            onComplete={recordEvolving}
            continueLabel={evolvingContinue}
            scenario={scenario}
            recallMode={recallMode}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: space.lg, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingBottom: space.md,
  },
  body: { flex: 1, gap: space.md, paddingBottom: space.lg },
  cardArea: { flex: 1 },
  qContent: { gap: space.lg, paddingVertical: space.md, paddingBottom: space.xxxl },
  phaseLabel: {
    ...type.label,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.brandDark,
  },
  narrative: { ...type.body, color: colors.ink, lineHeight: 23 },
  obsBox: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  obsTitle: {
    ...type.label,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.inkFaint,
    paddingTop: space.sm,
  },
});
