import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuItem } from '@/shared/types/navMenuItem.type';
import { ADMIN_URL, ADMIN_COURSES_URL, ADMIN_USERS_URL } from '@/shared/constants/urls.const';

export const ADMIN_QUICK_ACTIONS: NavMenuItem[] = [
  { Icon: WorkspacePremiumIcon, label: 'View Reports', path: ADMIN_URL },
  { Icon: ImportContactsRoundedIcon, label: 'Manage Courses', path: ADMIN_COURSES_URL },
  { Icon: PeopleAltRoundedIcon, label: 'Manage Users', path: ADMIN_USERS_URL },
];
