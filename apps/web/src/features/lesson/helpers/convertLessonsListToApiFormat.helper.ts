import { LessonListItem } from '../types/lessonListItem.type';

export const convertLessonsListToApiFormat = (lessons: LessonListItem[]) => {
  const formattedList = lessons.map((lessonItem, index) => ({
    LessonId: lessonItem.id,
    order: index,
  }));
  return { items: formattedList };
};
