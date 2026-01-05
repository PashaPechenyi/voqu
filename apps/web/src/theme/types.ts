import { Theme, SxProps, PaletteMode } from '@mui/material';

export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<any>>;
