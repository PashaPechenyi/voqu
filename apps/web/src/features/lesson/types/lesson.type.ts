import { LessonSegmentType } from './lessonSegmentType.type';

export type Lesson = {
  id: string;
  title: string;
  duration: number;
  // TODO: Lesson could have a few segments, each segment could be of a different type
  segmentType: LessonSegmentType;
  locked: boolean;
  order: number;
};
