import DashboardIcon from '@mui/icons-material/Dashboard';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { NavLinkWithIcon } from '@/shared/types/navLink.type';
import { ADMIN_URL, ADMIN_COURSES_URL } from '@/shared/constants/urls.const';

export const ADMIN_NAV_LINKS: NavLinkWithIcon[] = [
  { name: 'Dashboard', url: ADMIN_URL, icon: DashboardIcon },
  { name: 'Courses', url: ADMIN_COURSES_URL, icon: ImportContactsIcon },
];
