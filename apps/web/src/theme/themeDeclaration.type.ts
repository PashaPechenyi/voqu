import { PaletteColor, PaletteColorOptions } from '@mui/material';
import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/AppBar';
import '@mui/material/SvgIcon';
import '@mui/material/Typography';
import { TCustomPalette } from './theme.type';

declare module '@mui/material/styles' {
  interface Palette extends TCustomPalette<PaletteColor> {}

  interface PaletteOptions extends Partial<TCustomPalette<PaletteColorOptions>> {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends TCustomPalette<true> {}
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides extends TCustomPalette<true> {}
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides extends TCustomPalette<true> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides extends TCustomPalette<true> {}

  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}
