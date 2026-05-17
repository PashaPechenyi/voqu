import { Theme, SxProps } from '@mui/material';

export type SxStyleProps = SxProps<Theme>;
export type SxItem = Exclude<SxStyleProps, ReadonlyArray<unknown>>;

export type MuiColor =
  | 'tertiary'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
