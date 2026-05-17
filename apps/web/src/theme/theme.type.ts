// TODO: This file duplicates `theme/types.ts`. Pick a single name (`theme.type.ts` is consistent with the project convention `<name>.type.ts`) and delete the other.
// TODO: `Extract<TSxProps, ReadonlyArray<any>>` uses `any`. Replace with `unknown` or a stricter generic.
import { Theme, SxProps } from '@mui/material';

export type TSxProps = SxProps<Theme>;
export type TSxItem = Exclude<TSxProps, ReadonlyArray<any>>;
export type TSxArray = Extract<TSxProps, ReadonlyArray<any>>;
