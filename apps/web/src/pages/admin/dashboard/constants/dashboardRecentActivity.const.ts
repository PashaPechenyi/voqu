import { RecentActivity } from '../types/recentActivity.type';

export const recentActivity: RecentActivity[] = [
  {
    action: 'New course published',
    course: 'Business English Advanced',
    time: '2 hours ago',
    type: 'success',
  },
  { action: 'Course updated', course: 'Grammar Essentials', time: '5 hours ago', type: 'info' },
  { action: 'Lesson deleted', course: 'Vocabulary Builder', time: '1 day ago', type: 'warning' },
  {
    action: 'New student enrolled',
    course: 'Speaking Practice',
    time: '2 days ago',
    type: 'success',
  },
];
