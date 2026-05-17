import { Level } from '@/features/levels/types/level.type';
import { CourseStatusKey } from './courseStatus.type';

export type CourseFormValues = {
  title: string;
  description: string;
  level: Level | null;
  status: CourseStatusKey | null;
  image: string;
};
