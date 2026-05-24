import { Level } from '@/features/levels/types/level.type';
import { CourseStatus } from '../enums/courseStatus.enum';

export type Owner = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Course = {
  id: string;
  name: string;
  status: CourseStatus;
  Level: Level;
  owner?: Owner;
  createdAt?: string;
  updatedAt?: string;
  description: string;
};
