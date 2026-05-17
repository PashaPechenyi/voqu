import { PaletteColor, PaletteColorOptions } from '@mui/material';
import type { CSSProperties } from 'react';
import '@mui/material/styles';
import '@mui/material/Button';

type CustomPalette<T> = {
  tertiary: T;
};

declare module '@mui/material/styles' {
  interface Palette extends CustomPalette<PaletteColor> {}

  interface PaletteOptions extends Partial<CustomPalette<PaletteColorOptions>> {}

  interface TypographyVariants {
    body3: CSSProperties;
    body4: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: CSSProperties;
    body4?: CSSProperties;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends CustomPalette<true> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
  }
}
