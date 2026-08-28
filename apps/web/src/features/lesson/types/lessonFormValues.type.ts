import { LessonSegmentType } from './lessonSegmentType.type';

export type LessonFormValues = {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  segmentType: LessonSegmentType;
};
