import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, space } from '@/constants/theme';

interface VitalTileProps {
  label: string;
  value: string;
}

export function VitalTile({ label, value }: VitalTileProps) {
  return (
    <View style={styles.tile} accessible={true} accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexGrow: 1,
    flexBasis: '30%',
    // Cap growth so a 7-tile ER grid (3+3+1) doesn't stretch the orphan to full width.
    maxWidth: '33%',
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    gap: 2,
  },
  label: {
    fontFamily: font.mono,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.inkFaint,
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: font.mono,
    fontSize: 16,
    color: colors.ink,
    fontWeight: '600',
  },
});
