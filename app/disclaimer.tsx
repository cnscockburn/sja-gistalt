import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space, type } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/store/settingsStore';

export default function Disclaimer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const acknowledge = useSettings((s) => s.acknowledgeDisclaimer);

  const onContinue = () => {
    acknowledge();
    router.replace('/(tabs)');
  };

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + space.xl, paddingBottom: insets.bottom + space.lg },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.wordmark} accessibilityRole="header">
          GESTALT
        </Text>
        <Text style={styles.kicker}>Education &amp; practice tool</Text>

        <Text style={styles.heading} accessibilityRole="header">
          Before you start
        </Text>
        <Text style={styles.body}>
          This is an independent education and practice tool. It is not affiliated with,
          endorsed by, or officially released by St John Ambulance.
        </Text>
        <Text style={styles.body}>
          Content is based on UK Resuscitation Council and St John Ambulance guidelines, but it
          does not replace formal first aid training and must not be used as clinical decision
          support in a real emergency.
        </Text>
        <Text style={styles.body}>
          Always follow your organisation&apos;s protocols and the guidance of your training
          provider.
        </Text>
      </ScrollView>
      <Button label="I understand, continue" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: space.xl, backgroundColor: colors.bg },
  content: { gap: space.md, paddingBottom: space.xl },
  wordmark: { ...type.display, color: colors.ink, letterSpacing: 4 },
  kicker: { ...type.label, color: colors.brandDark, marginBottom: space.lg },
  heading: { ...type.h2, color: colors.ink, marginTop: space.sm },
  body: { ...type.body, color: colors.inkSoft, lineHeight: 23 },
});
