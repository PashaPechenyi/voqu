import { LessonListItem } from '../types/lesson.type';

// RENAME: converReorderLessonToApiFormat -> convertReorderLessonToApiFormat - fix typo; matches convert{Source}To{Target}Format naming
export const convertReorderLessonToApiFormat = (lessons: LessonListItem[]) => {
  const convertedLessons = lessons.map((lesson, index) => ({
    LessonId: lesson.id,
    order: index,
  }));
  return { items: convertedLessons };
};
