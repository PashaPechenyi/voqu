// TODO: `color: string` is too loose — accept palette tokens like `'primary.main'` via a typed union, or accept a `MuiColor` from `theme/types.ts`.
// TODO: `value: string` is fine for `'1,247'`/`'68%'` but if you compute these from API numbers, store `value: number | string` and format in the UI.
import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type DashboardStatistic = {
  label: string;
  value: string;
  change: string;
  Icon: FC<SvgIconProps>;
  color: string;
};
