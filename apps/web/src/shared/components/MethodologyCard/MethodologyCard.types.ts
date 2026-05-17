// TODO: Rename to `methodologyCard.type.ts` (singular) — see project convention. Also move next to the component (after the move out of `shared/`).
import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type MethodologyCardData = {
  id: number;
  title: string;
  description: string;
  Icon: FC<SvgIconProps>;
};
