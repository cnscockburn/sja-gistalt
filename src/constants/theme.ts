import { Platform } from 'react-native';

/**
 * Design tokens. See DESIGN.md for rationale.
 * Light theme only by design (sunlight legibility at outdoor events).
 */

export const colors = {
  bg: '#F6F5F1',
  surface: '#FCFBF8',
  surfaceRaised: '#FFFFFF',
  ink: '#1A1E1B',
  inkSoft: '#5A615B',
  inkFaint: '#8C918B',
  line: '#E2E0D8',
  lineStrong: '#CFCcC0',

  brand: '#0B5E3B',
  brandDark: '#084A2E',
  brandSoft: '#E6F0EA',

  sick: '#B23A2E',
  sickSoft: '#F6E6E3',
  notSick: '#0B5E3B',
  notSickSoft: '#E6F0EA',

  correct: '#0B5E3B',
  correctSoft: '#E6F0EA',
  wrong: '#B23A2E',
  wrongSoft: '#F6E6E3',

  accent: '#E8B23A',
  onBrand: '#F6F5F1',
  onSick: '#FBF1EF',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999,
} as const;

export const font = {
  sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
} as const;

export const type = {
  display: { fontSize: 30, fontWeight: '700' as const, letterSpacing: 0.5 },
  h1: { fontSize: 24, fontWeight: '700' as const },
  h2: { fontSize: 20, fontWeight: '700' as const },
  title: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.3 },
  caption: { fontSize: 13, fontWeight: '400' as const },
} as const;

export const elevation = {
  card: {
    shadowColor: '#1A1E1B',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
} as const;
