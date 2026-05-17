// TODO: Constant variable name `stats` is too generic. Rename to `DASHBOARD_STATISTICS` (uppercase + descriptive).
// TODO: All values are hardcoded mocks — wire to API.
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { DashboardStatistic } from '../types/dashboardStatistic.type';

export const stats: DashboardStatistic[] = [
  {
    label: 'Total Courses',
    value: '24',
    change: '+3 this month',
    Icon: ImportContactsRoundedIcon,
    color: 'primary.main',
  },
  {
    label: 'Active Students',
    value: '1,247',
    change: '+128 this week',
    Icon: PeopleAltOutlinedIcon,
    color: 'secondary.dark',
  },
  {
    label: 'Completion Rate',
    value: '68%',
    change: '+5% from last month',
    Icon: TrendingUpOutlinedIcon,
    color: 'primary.main',
  },
  {
    label: 'Certificates Issued',
    value: '342',
    change: '+42 this month',
    Icon: EmojiEventsOutlinedIcon,
    color: 'secondary.dark',
  },
];
