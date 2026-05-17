import { SvgIconComponent } from '@mui/icons-material';

export type NavLink = {
  name: string;
  url: string;
};

export type NavLinkWithIcon = NavLink & {
  icon: SvgIconComponent;
};
