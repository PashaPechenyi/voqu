import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuItem } from '@/shared/types/navMenuItem.type';
import { ADMIN_URL, ADMIN_COURSES_URL, ADMIN_USERS_URL } from '@/shared/constants/urls.const';

export const ADMIN_NAV_ITEMS: NavMenuItem[] = [
  { Icon: DashboardRoundedIcon, label: 'Dashboard', path: ADMIN_URL },
  { Icon: ImportContactsRoundedIcon, label: 'Courses', path: ADMIN_COURSES_URL },
  { Icon: PeopleAltRoundedIcon, label: 'Users', path: ADMIN_USERS_URL },
];
