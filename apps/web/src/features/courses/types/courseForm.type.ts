import { Level } from '@/features/levels/types/level.type';
import { CourseStatus } from '../enums/courseStatus.enum';

export type CourseFormValues = {
  name: string;
  level: Level | null;
  status: CourseStatus | null;
};
