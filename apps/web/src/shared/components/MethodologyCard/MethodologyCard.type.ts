import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type MethodologyCardItem = {
  id: number;
  title: string;
  description: string;
  Icon: FC<SvgIconProps>;
};
