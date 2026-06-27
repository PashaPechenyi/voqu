import { LessonListItem } from '../types/lesson.type';

export const converReorderLessonToApiFormat = (lessons: LessonListItem[]) => {
  const convertedLessons = lessons.map((lesson, index) => ({
    LessonId: lesson.id,
    order: index,
  }));
  return { items: convertedLessons };
};
