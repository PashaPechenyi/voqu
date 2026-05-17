import { Activity } from '../types/activity.type';
import { ActivityType } from '../enums/activityType.enum';

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    type: ActivityType.CoursePublished,
    label: 'New course published',
    name: 'Business English Advanced',
    time: '2 hours ago',
    color: 'success',
  },
  {
    id: 'a2',
    type: ActivityType.CourseUpdated,
    label: 'Course updated',
    name: 'Grammar Essentials',
    time: '5 hours ago',
    color: 'info',
  },
  {
    id: 'a3',
    type: ActivityType.LessonDeleted,
    label: 'Lesson deleted',
    name: 'Vocabulary Builder',
    time: '1 day ago',
    color: 'warning',
  },
  {
    id: 'a4',
    type: ActivityType.StudentEnrolled,
    label: 'New student enrolled',
    name: 'Speaking Practice',
    time: '2 days ago',
    color: 'success',
  },
];
