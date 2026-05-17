import { NavMenuItem } from '@/shared/types/navMenuItem.type';
import { HOME_URL, ABOUT_URL } from '@/shared/constants/urls.const';

export const PUBLIC_NAV_ITEMS: NavMenuItem[] = [
  { label: 'Головна', path: HOME_URL },
  { label: 'Про нас', path: ABOUT_URL },
];
