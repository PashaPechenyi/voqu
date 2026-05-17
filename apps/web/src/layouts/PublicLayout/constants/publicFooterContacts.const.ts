import { FC } from 'react';
import { SvgIconProps } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';

export type ContactItem = {
  id: string;
  Icon: FC<SvgIconProps>;
  path: string;
  value: string;
};

export const PUBLIC_FOOTER_CONTACTS: ContactItem[] = [
  { id: 'email', Icon: MailOutlineIcon, path: '#', value: 'voqu@gmail.com' },
  { id: 'phone', Icon: PhoneIcon, path: '#', value: '+11 222 333 444' },
  { id: 'address', Icon: PinDropIcon, path: '#', value: 'T. Shewchenka 11, Kyiv' },
];
