import { CourseStatus } from './course-status.enum';

export interface IUpdateCourseParams {
  name?: string;
  description?: string | null;
  status?: CourseStatus;
  LevelId?: string;
}
