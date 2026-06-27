import { LessonStatus } from '../enums/lessonStatus.enum';

export type LessonFormValues = {
  title: string;
  subtitle: string;
  description: string;
  status: LessonStatus | null;
};
