// TODO: `/contact` and `/privacy` paths do not exist in the router — clicking these links will dead-end on a blank page (no catch-all NotFound is configured either).
// TODO: Use `ABOUT_URL` constant from `shared/constants/urls.const.ts`; add CONTACT_URL/PRIVACY_URL there.
import { NavMenuItem } from '@/shared/types/navMenuItem.type';

export const publicFooterLinks: NavMenuItem[] = [
  { label: 'Про нас', path: '/about' },
  { label: 'Контакти', path: '/contact' },
  { label: 'Політика конфіденційності', path: '/privacy' },
];
