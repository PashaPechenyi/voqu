import { LessonStatus } from './lessonStatus.type';

export type LessonListItem = {
  id: string;
  CourseId: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  order: number;
  status: LessonStatus;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
};
