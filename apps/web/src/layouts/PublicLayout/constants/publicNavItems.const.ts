// TODO: Labels are Ukrainian, but the rest of the public site (`AboutUs.page`, footer) mixes English and Ukrainian. Pick one source language and use a translation layer (e.g. i18next) — having labels inlined makes a switch painful later.
// TODO: `{ label: 'table', path: '/admin' }` looks like a leftover dev shortcut — admin pages shouldn't be reachable from the public nav. Remove.
// TODO: Use `HOME_URL` / `ABOUT_URL` constants instead of literal `'/'` and `'/about'`.
import { NavMenuItem } from '@/shared/types/navMenuItem.type';

export const publicNavItems: NavMenuItem[] = [
  { label: 'Головна', path: '/' },
  { label: 'Про нас', path: '/about' },
  { label: 'table', path: '/admin' },
];
