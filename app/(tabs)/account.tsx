import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { colors, radius, space, type } from '@/constants/theme';
import { LEVEL_LABELS, type Level } from '@/types/level';
import { Segmented } from '@/components/ui/Segmented';
import { UnofficialBanner } from '@/components/ui/UnofficialBanner';
import { useSettings } from '@/store/settingsStore';

export default function Account() {
  const insets = useSafeAreaInsets();
  const level = useSettings((s) => s.level);
  const setLevel = useSettings((s) => s.setLevel);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + space.lg, paddingBottom: space.xxxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Account</Text>

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
        <Text style={styles.hint}>
          {LEVEL_LABELS[level]}. This controls which observations and scenarios you see.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>About</Text>
        <UnofficialBanner />
        <Text style={styles.body}>
          An independent education and practice tool for training clinical gestalt. Not affiliated
          with, endorsed by, or released by St John Ambulance. Content follows UK Resuscitation
          Council and St John Ambulance guidelines and does not replace formal training.
        </Text>
        <Text style={styles.version}>Version {Constants.expoConfig?.version ?? '1.0.0'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: space.xl, gap: space.xl },
  heading: { ...type.display, fontSize: 28, color: colors.ink },
  section: { gap: space.sm },
  sectionLabel: { ...type.label, color: colors.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5 },
  hint: { ...type.caption, color: colors.inkFaint, lineHeight: 19 },
  body: { ...type.body, color: colors.inkSoft, lineHeight: 22 },
  version: { ...type.caption, color: colors.inkFaint, marginTop: space.xs },
});
