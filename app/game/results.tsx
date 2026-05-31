import { useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space, type } from '@/constants/theme';
import { scoreSession } from '@/utils/scoring';
import { Button } from '@/components/ui/Button';
import { ScoreHeader } from '@/components/results/ScoreHeader';
import { ScenarioResultCard } from '@/components/results/ScenarioResultCard';
import { useGame } from '@/store/gameStore';
import { useSettings } from '@/store/settingsStore';
import { buildDeck } from '@/hooks/useDeck';

export default function Results() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const session = useGame((s) => s.session);
  const startSession = useGame((s) => s.startSession);
  const reset = useGame((s) => s.reset);
  const stackSize = useSettings((s) => s.stackSize);
  const incrementCompletedSessions = useSettings((s) => s.incrementCompletedSessions);

  useEffect(() => {
    if (!session) router.replace('/(tabs)');
  }, [session, router]);

  // Count completed sessions so the home screen can collapse the
  // "How it works" reminder for returning users after the first session.
  // Guard on session to avoid incrementing when the screen is mounted without
  // a real completed session (direct navigation, Android back-stack replay).
  useEffect(() => {
    if (!session) return;
    incrementCompletedSessions();
    // Only fire once per results mount, not on re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const score = useMemo(() => {
    if (!session) return null;
    return scoreSession(session.deck, session.answers, session.mode, session.level);
  }, [session]);

  if (!session || !score) return null;

  const byId = new Map(session.deck.map((s) => [s.id, s]));
  // Build a lookup from the already-computed breakdown so each ScenarioResultCard
  // receives its pre-computed score instead of calling scoreScenario again.
  const scoreById = new Map(score.breakdown.map((s) => [s.scenarioId, s]));

  const onPlayAgain = async () => {
    const deck = await buildDeck(session.level, stackSize);
    if (deck.length === 0) {
      goHome();
      return;
    }
    startSession(deck, session.level, session.mode);
    router.replace('/game');
  };

  const goHome = () => {
    reset();
    router.replace('/(tabs)');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + space.lg, paddingBottom: insets.bottom + space.xxxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Debrief</Text>
      <ScoreHeader score={score} />

      <View style={styles.list}>
        {session.answers.map((answer) => {
          const scenario = byId.get(answer.scenarioId);
          if (!scenario) return null;
          return (
            <ScenarioResultCard
              key={answer.scenarioId}
              scenario={scenario}
              answer={answer}
              level={session.level}
              mode={session.mode}
              score={scoreById.get(answer.scenarioId)}
            />
          );
        })}
      </View>

      <View style={styles.actions}>
        <Button label="Play again" onPress={onPlayAgain} />
        <Button label="Back to home" variant="secondary" onPress={goHome} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: space.xl, gap: space.lg },
  heading: { ...type.display, fontSize: 28, color: colors.ink },
  list: { gap: space.md },
  actions: { gap: space.md, marginTop: space.sm },
});
