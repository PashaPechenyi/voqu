import { Theme, SxProps } from '@mui/material';

export type TCustomPalette<T> = {
  tertiary: T;
  adminPrimary: T;
  adminSecondary: T;
};

export type TMuiColors =
  | keyof TCustomPalette<unknown>
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<unknown>>;
export type TSxArray = Extract<TSxProps, ReadonlyArray<unknown>>;
