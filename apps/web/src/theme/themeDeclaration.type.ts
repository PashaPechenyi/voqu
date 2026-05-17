// TODO: Merge this file with `theme/types.ts` — having three theme-augmentation files (`themeDeclaration.type.ts`, `types.ts`, `theme.type.ts`) for the same MUI module augmentation is confusing and error-prone (e.g. `tertiary` is in one file, `adminPrimary` in another, so they can drift).
// TODO: `PaletteOptions.adminSecondary` is missing the `?` modifier present on `adminPrimary?` — both should be optional to match MUI conventions.
import { PaletteColor, PaletteColorOptions } from '@mui/material';
import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/AppBar';
import '@mui/material/SvgIcon';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface Palette {
    adminPrimary: PaletteColor;
    adminSecondary: PaletteColor;
  }

  interface PaletteOptions {
    adminPrimary?: PaletteColorOptions;
    adminSecondary: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    adminPrimary: true;
    adminSecondary: true;
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    adminPrimary: true;
    adminSecondary: true;
  }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    adminPrimary: true;
    adminSecondary: true;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    adminPrimary: true;
    adminSecondary: true;
  }
}
