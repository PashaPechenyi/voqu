import { LessonListItem } from '../types/lesson.type';

export const convertReorderLessonToApiFormat = (lessons: LessonListItem[]) => {
  const convertedLessons = lessons.map((lesson, index) => ({
    LessonId: lesson.id,
    order: index,
  }));
  return { items: convertedLessons };
};
