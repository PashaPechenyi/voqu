import { AdminNavMenuItem } from './../../models/models';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
export const adminNavItems: AdminNavMenuItem[] = [
  { Icon: DashboardRoundedIcon, label: 'Dashboard', path: '/' },
  { Icon: ImportContactsRoundedIcon, label: 'Courses', path: '/about' },
  { Icon: PeopleAltRoundedIcon, label: 'Users', path: '/table' },
];
export const adminQuickActions: AdminNavMenuItem[] = [
  { Icon: WorkspacePremiumIcon, label: 'View Reports', path: '/' },
  { Icon: ImportContactsRoundedIcon, label: 'Manage Courses', path: '/about' },
  { Icon: PeopleAltRoundedIcon, label: 'Manage Users', path: '/table' },
];
