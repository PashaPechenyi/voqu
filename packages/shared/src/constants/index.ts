import { Level } from '../types';

export const LEVEL_ORDER: Level[] = [
  Level.A1,
  Level.A2,
  Level.B1,
  Level.B2,
  Level.C1,
  Level.C2,
];

export const LEVEL_NAMES: Record<Level, string> = {
  [Level.A1]: 'Beginner',
  [Level.A2]: 'Elementary',
  [Level.B1]: 'Intermediate',
  [Level.B2]: 'Upper-Intermediate',
  [Level.C1]: 'Advanced',
  [Level.C2]: 'Proficient',
};
