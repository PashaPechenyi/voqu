import { CourseStatusKey } from './courseStatus.type';

export type Course = {
  id: string;
  name: string;
  status: CourseStatusKey | string;
  LevelId: number;
  OwnerId: string;
  createdAt: string;
  updatedAt: string;
};
