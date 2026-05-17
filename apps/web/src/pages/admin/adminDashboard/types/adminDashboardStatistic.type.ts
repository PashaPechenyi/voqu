import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type AdminDashboardStatistic = {
  label: string;
  value: string;
  change: string;
  Icon: FC<SvgIconProps>;
  color: string;
};
