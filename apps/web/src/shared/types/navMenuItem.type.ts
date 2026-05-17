// TODO: Two types in a single file. Per the project's "one type per file" pattern (each `<typeName>.type.ts`), split `NavMenuIconItem` into its own file `navMenuIconItem.type.ts`. Or merge as discriminated union `NavMenuItem` if they truly represent the same concept.
// TODO: `NavMenuIconItem` should extend `NavMenuItem` instead of repeating the `label`/`path` fields.
import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type NavMenuItem = { label: string; path: string };
export type NavMenuIconItem = { label: string; path: string; Icon: FC<SvgIconProps> };
