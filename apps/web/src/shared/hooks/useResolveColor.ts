import { useCallback } from 'react';
import { useTheme } from '@mui/material';
import { MuiColor } from '@/shared/types/sx.type';

const PALETTE_KEYS: readonly MuiColor[] = [
  'tertiary',
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];

const isMuiColor = (color: string): color is MuiColor =>
  (PALETTE_KEYS as readonly string[]).includes(color);

export const useResolveColor = () => {
  const theme = useTheme();

  const resolveColorFromPalette = useCallback(
    (color: MuiColor | string): string => {
      if (isMuiColor(color)) return theme.palette[color].main;
      return color;
    },
    [theme],
  );

  return { resolveColorFromPalette };
};
