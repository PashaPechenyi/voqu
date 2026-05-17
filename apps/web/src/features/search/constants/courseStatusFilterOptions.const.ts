import { CourseStatus } from '@/features/courses/enums/courseStatus.enum';

export type CourseStatusFilterValue = CourseStatus | 'all';

export type CourseStatusFilterOption = {
  value: CourseStatusFilterValue;
  label: string;
};

export const COURSE_STATUS_FILTER_OPTIONS: CourseStatusFilterOption[] = [
  { value: 'all', label: 'All courses' },
  { value: CourseStatus.Published, label: 'Published' },
  { value: CourseStatus.Draft, label: 'Draft' },
];
