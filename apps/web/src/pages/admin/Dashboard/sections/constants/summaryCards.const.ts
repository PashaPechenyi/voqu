import { SvgIconComponent } from '@mui/icons-material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export type SummaryCard = {
  icon: SvgIconComponent;
  number: string;
  description: string;
  changes: string;
};

export const MOCK_SUMMARY_CARDS: SummaryCard[] = [
  {
    icon: ImportContactsIcon,
    number: '24',
    description: 'Total Courses',
    changes: '+3 this month',
  },
  {
    icon: GroupIcon,
    number: '1,247',
    description: 'Active Students',
    changes: '+128 this week',
  },
  {
    icon: TrendingUpIcon,
    number: '68%',
    description: 'Completion Rate',
    changes: '+5% from last month',
  },
  {
    icon: WorkspacePremiumIcon,
    number: '342',
    description: 'Certificates Issued',
    changes: '+42 this month',
  },
];
