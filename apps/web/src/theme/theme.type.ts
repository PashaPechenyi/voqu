import { Theme, SxProps } from '@mui/material';

export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<any>>;
export type TSxArray = Extract<TSxProps, ReadonlyArray<any>>;
