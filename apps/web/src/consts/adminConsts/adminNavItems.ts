import { AdminNavMenuItem } from './../../models/models';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
export const adminNavItems: AdminNavMenuItem[] = [
  { Icon: DashboardRoundedIcon, label: 'Dashboard', path: '/admin' },
  { Icon: ImportContactsRoundedIcon, label: 'Courses', path: '/admin-courses' },
  { Icon: PeopleAltRoundedIcon, label: 'Users', path: '/table' },
];
export const adminQuickActions: AdminNavMenuItem[] = [
  { Icon: WorkspacePremiumIcon, label: 'View Reports', path: '/admin' },
  { Icon: ImportContactsRoundedIcon, label: 'Manage Courses', path: '/admin-courses' },
  { Icon: PeopleAltRoundedIcon, label: 'Manage Users', path: '/table' },
];
