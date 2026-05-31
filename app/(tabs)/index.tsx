import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, type } from '@/constants/theme';
import { LEVEL_LABELS, type Level } from '@/types/level';
import type { GameMode, GameSession, StackSize } from '@/types/game';
import { Segmented } from '@/components/ui/Segmented';
import { Button } from '@/components/ui/Button';
import { UnofficialBanner } from '@/components/ui/UnofficialBanner';
import { useSettings } from '@/store/settingsStore';
import { useGame } from '@/store/gameStore';
import { buildDeck } from '@/hooks/useDeck';
import { clearActiveSession, loadActiveSession } from '@/utils/sessionStorage';

const MODE_HINT: Record<GameMode, string> = {
  normal: 'Swipe sick or not-sick, then answer management follow-ups.',
  'swipe-only': 'Just the sick or not-sick call. No follow-up questions.',
};

export default function PracticeHome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { level, gameMode, stackSize, setLevel, setGameMode, setStackSize } = useSettings();
  const startSession = useGame((s) => s.startSession);
  const resumeSession = useGame((s) => s.resumeSession);

  const [resumable, setResumable] = useState<GameSession | null>(null);
  const [starting, setStarting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadActiveSession().then((s) => {
        if (active) setResumable(s);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const onStart = async () => {
    setStarting(true);
    try {
      const deck = await buildDeck(level, stackSize);
      if (deck.length === 0) {
        Alert.alert('No scenarios', 'No scenarios are available for this level yet.');
        return;
      }
      startSession(deck, level, gameMode);
      router.push('/game');
    } finally {
      setStarting(false);
    }
  };

  const onResume = () => {
    if (!resumable) return;
    resumeSession(resumable);
    router.push('/game');
  };

  const onDiscardResume = () => {
    void clearActiveSession();
    setResumable(null);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + space.lg, paddingBottom: space.xxxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.wordmark}>GESTALT</Text>
      <UnofficialBanner />

      {resumable && (
        <Pressable style={styles.resume} onPress={onResume}>
          <View style={styles.resumeText}>
            <Text style={styles.resumeTitle}>Resume session</Text>
            <Text style={styles.resumeSub}>
              {LEVEL_LABELS[resumable.level]} · card {resumable.currentIndex + 1} of{' '}
              {resumable.deck.length}
            </Text>
          </View>
          <Pressable hitSlop={12} onPress={onDiscardResume}>
            <Ionicons name="close" size={20} color={colors.inkSoft} />
          </Pressable>
        </Pressable>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Clinical level</Text>
        <Segmented<Level>
          options={[
            { label: 'CFA', value: 'cfa' },
            { label: 'ER', value: 'er' },
          ]}
          value={level}
          onChange={setLevel}
        />
        <Text style={styles.hint}>{LEVEL_LABELS[level]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Scenarios in stack</Text>
        <Segmented<StackSize>
          options={[
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
          ]}
          value={stackSize}
          onChange={setStackSize}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Mode</Text>
        <Segmented<GameMode>
          options={[
            { label: 'Normal', value: 'normal' },
            { label: 'Swipe only', value: 'swipe-only' },
          ]}
          value={gameMode}
          onChange={setGameMode}
        />
        <Text style={styles.hint}>{MODE_HINT[gameMode]}</Text>
      </View>

      <View style={styles.reminder}>
        <Text style={styles.reminderTitle}>How it works</Text>
        <Text style={styles.reminderText}>
          Swipe left for not-sick, right for sick. Sick patients need escalation, further
          workup or transport. Not-sick patients can be treated on scene.
        </Text>
      </View>

      <Button label={starting ? 'Preparing…' : 'Start'} onPress={onStart} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: space.xl, gap: space.xl },
  wordmark: { ...type.display, color: colors.ink, letterSpacing: 4 },
  resume: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.brandSoft,
    borderRadius: radius.md,
    padding: space.lg,
  },
  resumeText: { flex: 1, gap: 2 },
  resumeTitle: { ...type.title, color: colors.brandDark },
  resumeSub: { ...type.caption, color: colors.brandDark },
  section: { gap: space.sm },
  sectionLabel: {
    ...type.label,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hint: { ...type.caption, color: colors.inkFaint },
  reminder: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.xs,
  },
  reminderTitle: { ...type.title, color: colors.ink },
  reminderText: { ...type.body, color: colors.inkSoft, lineHeight: 22 },
});
