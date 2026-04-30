import { KeyOf } from '@/shared/types/utils.types';

export const COURSE_STATUS_KEY = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const;

export type CourseStatusKey = KeyOf<typeof COURSE_STATUS_KEY>;
export const COURSE_STATUSES_LIST = Object.values(COURSE_STATUS_KEY);
