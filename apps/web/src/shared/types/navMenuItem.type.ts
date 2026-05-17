import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type NavMenuItem = {
  label: string;
  path: string;
  Icon?: FC<SvgIconProps>;
};
