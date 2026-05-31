import { useWindowDimensions, StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, radius, space, type } from '@/constants/theme';
import type { Level } from '@/types/level';
import type { Scenario, Verdict } from '@/types/scenario';
import { PatientCard } from '@/components/card/PatientCard';

interface SwipeableCardProps {
  scenario: Scenario;
  level: Level;
  onVerdict: (verdict: Verdict) => void;
}

const SWIPE_OUT = 500;
const easeOut = Easing.out(Easing.cubic);

export function SwipeableCard({ scenario, level, onVerdict }: SwipeableCardProps) {
  const { width } = useWindowDimensions();
  const threshold = width * 0.28;
  const translateX = useSharedValue(0);

  // Horizontal pan that yields to vertical scrolling inside the card:
  // activeOffsetX starts the swipe only past a horizontal threshold, while
  // failOffsetY hands a mostly-vertical drag back to the inner ScrollView.
  const pan = Gesture.Pan()
    .activeOffsetX([-16, 16])
    .failOffsetY([-14, 14])
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      const committed = Math.abs(e.translationX) > threshold || Math.abs(e.velocityX) > 800;
      if (committed) {
        const verdict: Verdict = e.translationX > 0 ? 'sick' : 'not-sick';
        translateX.value = withTiming(
          verdict === 'sick' ? SWIPE_OUT : -SWIPE_OUT,
          { duration: 200, easing: easeOut },
          (done) => {
            if (done) runOnJS(onVerdict)(verdict);
          }
        );
      } else {
        translateX.value = withTiming(0, { duration: 200, easing: easeOut });
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${interpolate(translateX.value, [-width, width], [-8, 8])}deg` },
    ],
  }));

  const sickStamp = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [10, threshold], [0, 1], 'clamp'),
  }));
  const notSickStamp = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-threshold, -10], [1, 0], 'clamp'),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.fill, cardStyle]}>
        <Animated.View style={[styles.stamp, styles.stampLeft, notSickStamp]}>
          <Text style={[styles.stampText, styles.stampNotSick]}>NOT SICK</Text>
        </Animated.View>
        <Animated.View style={[styles.stamp, styles.stampRight, sickStamp]}>
          <Text style={[styles.stampText, styles.stampSick]}>SICK</Text>
        </Animated.View>
        <PatientCard scenario={scenario} level={level} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  stamp: {
    position: 'absolute',
    top: space.lg,
    zIndex: 10,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.sm,
    borderWidth: 3,
    transform: [{ rotate: '-8deg' }],
  },
  stampLeft: { left: space.lg, borderColor: colors.notSick },
  stampRight: { right: space.lg, borderColor: colors.sick },
  stampText: { ...type.h2, letterSpacing: 1 },
  stampNotSick: { color: colors.notSick },
  stampSick: { color: colors.sick },
});
