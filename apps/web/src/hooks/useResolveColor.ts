import { TMuiColors } from '@/theme/types';
import { useTheme } from '@mui/material';

/**
 * Hook to resolve MUI color names to actual color values
 * @returns Function that converts MUI color name or CSS color value to CSS color value
 */
const useResolveColor = () => {
  const theme = useTheme();

  const resolveColorFromPalette = (color: TMuiColors | string): string => {
    return theme?.palette?.[color as TMuiColors]?.main || color;
  };

  return { resolveColorFromPalette };
};

export default useResolveColor;
