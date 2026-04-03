import { Theme, SxProps, PaletteColor, PaletteColorOptions } from '@mui/material';
import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/AppBar';
import '@mui/material/SvgIcon';
import '@mui/material/Typography';
export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<any>>;

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
