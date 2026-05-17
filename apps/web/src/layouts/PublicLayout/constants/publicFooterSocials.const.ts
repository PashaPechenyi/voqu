import { FC } from 'react';
import { SvgIconProps } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export type SocialMediaButton = {
  id: string;
  Icon: FC<SvgIconProps>;
  path: string;
};

export const PUBLIC_FOOTER_SOCIALS: SocialMediaButton[] = [
  { id: 'instagram', Icon: InstagramIcon, path: '#' },
  { id: 'facebook', Icon: FacebookIcon, path: '#' },
  { id: 'linkedin', Icon: LinkedInIcon, path: '#' },
];
