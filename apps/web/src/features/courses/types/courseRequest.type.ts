import { Level } from '@/features/levels/types/level.type';
import { CourseStatus } from '../enums/courseStatus.enum';

export type CreateCourseReqBody = {
  name: string;
  status: CourseStatus;
  LevelId: Level['id'];
};

export type EditCourseReqBody = {
  name: string;
  status: CourseStatus;
  LevelId: Level['id'];
};
