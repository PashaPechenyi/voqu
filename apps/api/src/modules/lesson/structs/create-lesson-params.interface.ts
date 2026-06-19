import { LessonStatus } from './lesson-status.enum';

export interface ICreateLessonParams {
  CourseId: string;
  title: string;
  subtitle?: string;
  description?: string;
  status?: LessonStatus;
  duration?: number;
}
