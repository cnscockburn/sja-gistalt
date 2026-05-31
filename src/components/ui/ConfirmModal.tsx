import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
// ConfirmModal uses a transparent Modal with two layers:
//   1. A full-screen Pressable overlay (dismisses on tap-outside)
//   2. A plain View card (not Pressable) so screen readers don't encounter
//      an unlabelled interactive element inside the modal.
import { colors, radius, space, type } from '@/constants/theme';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Set true to render the confirm button in the destructive (terracotta) style. */
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      {/* Tap outside the card to dismiss. Hidden from a11y tree — the Cancel button
          inside the card is the accessible dismissal path for screen reader users. */}
      <Pressable
        style={styles.overlay}
        onPress={onCancel}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {/* accessibilityViewIsModal restricts TalkBack exploration to descendants only (Android). */}
        <View style={styles.card} accessibilityViewIsModal={true}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              style={({ pressed }) => [
                styles.btn,
                styles.btnCancel,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.btnCancelLabel}>{cancelLabel}</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.btn,
                destructive ? styles.btnDestructive : styles.btnConfirm,
                pressed && styles.pressed,
              ]}
            >
              <Text style={destructive ? styles.btnDestructiveLabel : styles.btnConfirmLabel}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 30, 27, 0.55)', // colors.ink (#1A1E1B) at 55% opacity
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: space.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: space.xl,
    gap: space.lg,
  },
  title: { ...type.h2, color: colors.ink },
  message: { ...type.body, color: colors.inkSoft, lineHeight: 22 },
  actions: {
    flexDirection: 'row',
    gap: space.md,
    marginTop: space.xs,
  },
  btn: {
    flex: 1,
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.lineStrong,
  },
  btnCancelLabel: { ...type.title, color: colors.ink },
  btnConfirm: {
    backgroundColor: colors.brand,
  },
  btnConfirmLabel: { ...type.title, color: colors.onBrand },
  btnDestructive: {
    backgroundColor: colors.sick,
  },
  btnDestructiveLabel: { ...type.title, color: colors.onSick },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
});
