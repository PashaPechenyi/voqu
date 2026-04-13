import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuIconItem } from '@/shared/types/navMenuItem.type';

export const adminNavItems: NavMenuIconItem[] = [
  { Icon: DashboardRoundedIcon, label: 'Dashboard', path: '/' },
  { Icon: ImportContactsRoundedIcon, label: 'Courses', path: '/about' },
  { Icon: PeopleAltRoundedIcon, label: 'Users', path: '/table' },
];
