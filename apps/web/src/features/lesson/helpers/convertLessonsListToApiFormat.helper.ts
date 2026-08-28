import { LessonListItem } from '../types/lessonListItem.type';
import { WordlistSegment } from '../types/wordlistSegment.type';

export const convertLessonsListToApiFormat = (lessons: LessonListItem[]) => {
  const formattedList = lessons.map((lessonItem, index) => ({
    LessonId: lessonItem.id,
    order: index,
  }));
  return { items: formattedList };
};
export const convertSegmentsListToApiFormat = (segments: WordlistSegment[]) => {
  const formattedList = segments.map((segmItem, index) => ({
    SegmentId: segmItem.id,
    order: index,
  }));
  return { items: formattedList };
};
