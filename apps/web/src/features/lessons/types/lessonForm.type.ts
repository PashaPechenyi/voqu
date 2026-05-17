import { LessonType } from '../enums/lessonType.enum';

export type LessonFormValues = {
  title: string;
  type: LessonType | null;
};
