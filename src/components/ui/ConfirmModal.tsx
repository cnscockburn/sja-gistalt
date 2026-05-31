import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
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
      {/* Tap outside to dismiss */}
      <Pressable style={styles.overlay} onPress={onCancel}>
        {/* Stop propagation so tapping the card doesn't dismiss */}
        <Pressable style={styles.card} onPress={() => {}}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 30, 27, 0.55)',
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
