import { LessonStatus } from '../enums/lessonStatus.enum';

export type LessonListItem = {
  id: string;
  CourseId: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  status: LessonStatus;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
};
