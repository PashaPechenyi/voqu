// TODO: Reuses the `NavMenuIconItem` type but quick-action items semantically differ from navigation items (they're CTAs). Either define a `QuickAction` type or reuse `NavMenuIconItem` consistently and rename it to something broader (`IconLinkItem`).
// TODO: Hardcoded paths `/admin`, `/admin/courses`, `/table` — use URL constants from `shared/constants/urls.const.ts`. `/table` is also not a real route.
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { NavMenuIconItem } from '@/shared/types/navMenuItem.type';

export const adminQuickActions: NavMenuIconItem[] = [
  { Icon: WorkspacePremiumIcon, label: 'View Reports', path: '/admin' },
  { Icon: ImportContactsRoundedIcon, label: 'Manage Courses', path: '/admin/courses' },
  { Icon: PeopleAltRoundedIcon, label: 'Manage Users', path: '/table' },
];
