import { NavLink } from '@/shared/types/navLink.type';
import { ABOUT_URL, LANDING_PAGE_URL } from '@/shared/constants/urls.const';

export const PUBLIC_NAV_LINKS: NavLink[] = [
  { name: 'Home', url: LANDING_PAGE_URL },
  { name: 'About us', url: ABOUT_URL },
];
