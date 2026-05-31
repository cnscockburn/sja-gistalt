import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { radius, space, type } from '@/constants/theme';

export function UnofficialBanner() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="information-circle-outline" size={16} color="#8A6312" />
      <Text style={styles.text}>
        Independent practice tool. Not an official St John Ambulance product.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    backgroundColor: '#FBF1DE',
    borderRadius: radius.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
  },
  text: { ...type.caption, fontSize: 12, color: '#8A6312', flex: 1 },
});
