import { LessonStatus } from './lessonStatus.type';
import { WordlistSegment } from './wordlistSegment.type';
export type LocalizedValue = {
  value: string;
  translation: null | string;
};
export type LessonDetails = {
  id: string;
  CourseId: string;
  sourceLanguage: string;
  translationLanguage: string;
  title: LocalizedValue;
  subtitle: LocalizedValue;
  description: LocalizedValue;
  order: number;
  status: LessonStatus;
  duration: null | number;
  segments: WordlistSegment[];
};
