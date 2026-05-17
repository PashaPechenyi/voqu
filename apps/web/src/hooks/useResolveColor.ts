// TODO: Top-level `src/hooks/` directory is not part of the architecture (only `features/<entity>/hooks/`, page-local `hooks/`, or `shared/hooks/` are allowed). Move this file to `shared/hooks/useResolveColor.ts`.
// TODO: This hook is not used anywhere in the codebase. Delete if unused, or wire it in where colors are passed as strings.
// TODO: Default-export style is mixed across the project (some hooks `export default`, others named-export). Pick one convention and apply consistently. The MEMORY.md and CLAUDE.md don't enforce one, but consistency matters.
// TODO: `color as TMuiColors` cast hides the case when `color` is a plain CSS string — the cast is unsafe. Narrow with a guard instead.
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
