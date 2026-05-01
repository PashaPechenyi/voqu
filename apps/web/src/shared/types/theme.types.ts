import { Theme, SxProps, PaletteColor, PaletteColorOptions } from '@mui/material';
import type { CSSProperties } from 'react';
import '@mui/material/styles';
import '@mui/material/Button';

type TCustomPalette<T> = {
  tertiary: T;
};

export type TMuiColors =
  | keyof TCustomPalette<unknown>
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

declare module '@mui/material/styles' {
  interface Palette extends TCustomPalette<PaletteColor> {}

  interface PaletteOptions extends Partial<TCustomPalette<PaletteColorOptions>> {}

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
  interface ButtonPropsColorOverrides extends TCustomPalette<true> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
  }
}

export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<any>>;
