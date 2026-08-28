import { CourseStatusKey } from './courseStatus.type';

export type Course = {
  id: string;
  name: string;
  status: CourseStatusKey;
  Level: {
    id: number;
    name: string;
    cefrLevel: string;
  };
  Owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};
