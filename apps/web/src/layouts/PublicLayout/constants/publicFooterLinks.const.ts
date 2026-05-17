import { NavMenuItem } from '@/shared/types/navMenuItem.type';
import { ABOUT_URL, CONTACT_URL, PRIVACY_URL } from '@/shared/constants/urls.const';

export const PUBLIC_FOOTER_LINKS: NavMenuItem[] = [
  { label: 'Про нас', path: ABOUT_URL },
  { label: 'Контакти', path: CONTACT_URL },
  { label: 'Політика конфіденційності', path: PRIVACY_URL },
];
