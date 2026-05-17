// TODO: Two parallel theme type files exist — `theme/types.ts` and `theme/theme.type.ts` — plus `theme/themeDeclaration.type.ts`. Consolidate into one source of truth.
// TODO: `theme/types.ts` declares `tertiary` augmentation but `theme/themeDeclaration.type.ts` declares `adminPrimary`/`adminSecondary`. They should be merged.
// TODO: `PaletteMode` is imported but unused.
// TODO: `Exclude<TSxProps, ReadonlyArray<any>>` uses `any` — should be `unknown` or a concrete shape.
// TODO: This file mirrors `theme/theme.type.ts` (duplicate `TSxProps`/`TSxItem`). Remove duplication.
import { Theme, SxProps, PaletteMode, PaletteColor, PaletteColorOptions } from '@mui/material';
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
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends TCustomPalette<true> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<any>>;

