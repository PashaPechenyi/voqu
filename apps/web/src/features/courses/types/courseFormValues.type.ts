// TODO: `image: string` should probably be `image?: string` or `imageUrl: string | null` — image is optional for a draft course (and the AddCourseModal requires it which is questionable UX).
import { Level } from '@/features/levels/types/level/level.type';
import { CourseStatusKey } from './courseStatus.type';

export type CourseFormValues = {
  title: string;
  description: string;
  level: Level | null;
  status: CourseStatusKey | null;
  image: string;
};
