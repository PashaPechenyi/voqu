import { DashboardStats } from './../../models/models';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
export const stats: DashboardStats[] = [
  {
    label: 'Total Courses',
    value: '24',
    change: '+3 this month',
    Icon: ImportContactsRoundedIcon,
    color: '#71677C',
  },
  {
    label: 'Active Students',
    value: '1,247',
    change: '+128 this week',
    Icon: PeopleAltOutlinedIcon,
    color: '#A99F96',
  },
  {
    label: 'Completion Rate',
    value: '68%',
    change: '+5% from last month',
    Icon: TrendingUpOutlinedIcon,
    color: '#71677C',
  },
  {
    label: 'Certificates Issued',
    value: '342',
    change: '+42 this month',
    Icon: EmojiEventsOutlinedIcon,
    color: '#A99F96',
  },
];
