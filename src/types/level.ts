export type Level = 'cfa' | 'er';

export const LEVEL_LABELS: Record<Level, string> = {
  cfa: 'Community First Aider',
  er: 'Emergency Responder',
};

export const LEVEL_SHORT: Record<Level, string> = {
  cfa: 'CFA',
  er: 'ER',
};
