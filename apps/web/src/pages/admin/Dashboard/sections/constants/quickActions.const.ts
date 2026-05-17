import { SvgIconComponent } from '@mui/icons-material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ADMIN_COURSES_URL, ADMIN_URL } from '@/shared/constants/urls.const';

export type QuickAction = {
  icon: SvgIconComponent;
  description: string;
  url: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
  { icon: ImportContactsIcon, description: 'Manage Courses', url: ADMIN_COURSES_URL },
  { icon: GroupIcon, description: 'Manage users', url: ADMIN_URL },
  { icon: TrendingUpIcon, description: 'View Reports', url: ADMIN_URL },
  { icon: TimelineIcon, description: 'Settings', url: ADMIN_URL },
];
