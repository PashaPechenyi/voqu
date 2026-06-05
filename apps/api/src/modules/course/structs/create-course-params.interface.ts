import { CourseStatus } from './course-status.enum';

export interface ICreateCourseParams {
  name: string;
  description?: string;
  status?: CourseStatus;
  LevelId: number;
}
