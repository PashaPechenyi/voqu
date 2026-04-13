import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type DashboardStatistic = {
  label: string;
  value: string;
  change: string;
  Icon: FC<SvgIconProps>;
  color: string;
};
