import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuIconItem } from '@/shared/types/navMenuItem.type';

export const adminNavItems: NavMenuIconItem[] = [
  { Icon: DashboardRoundedIcon, label: 'Dashboard', path: '/admin' },
  { Icon: ImportContactsRoundedIcon, label: 'Courses', path: '/admin/courses' },
  { Icon: PeopleAltRoundedIcon, label: 'Users', path: '/table' },
];
