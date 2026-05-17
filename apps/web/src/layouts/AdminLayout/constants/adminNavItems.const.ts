// TODO: Paths are hardcoded strings `'/admin'`, `'/admin/courses'`, `'/table'`. Use the constants from `shared/constants/urls.const.ts` (`ADMIN_URL`, `ADMIN_COURSES_URL`).
// TODO: `/table` is not a valid route in the router — it will 404. Remove or replace with the real Users route once it exists.
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuIconItem } from '@/shared/types/navMenuItem.type';

export const adminNavItems: NavMenuIconItem[] = [
  { Icon: DashboardRoundedIcon, label: 'Dashboard', path: '/admin' },
  { Icon: ImportContactsRoundedIcon, label: 'Courses', path: '/admin/courses' },
  { Icon: PeopleAltRoundedIcon, label: 'Users', path: '/table' },
];
