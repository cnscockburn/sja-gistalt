import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@/constants/theme';
import { useSettings } from '@/store/settingsStore';

export default function Index() {
  const hydrated = useSettings((s) => s.hydrated);
  const hasSeenDisclaimer = useSettings((s) => s.hasSeenDisclaimer);

  if (!hydrated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.bg,
        }}
      >
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  return <Redirect href={hasSeenDisclaimer ? '/(tabs)' : '/disclaimer'} />;
}
