import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuIconItem } from '@/shared/types/navMenuItem.type';

export const adminQuickActions: NavMenuIconItem[] = [
  { Icon: WorkspacePremiumIcon, label: 'View Reports', path: '/' },
  { Icon: ImportContactsRoundedIcon, label: 'Manage Courses', path: '/about' },
  { Icon: PeopleAltRoundedIcon, label: 'Manage Users', path: '/table' },
];
