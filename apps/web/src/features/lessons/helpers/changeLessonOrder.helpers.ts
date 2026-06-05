import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lesson.type';

type ReorderLessonsBody = {
  items: {
    LessonId: string;
    order: number;
  }[];
};

export const changeLessonOrder = async (
  body: ReorderLessonsBody,
  courseId: Course['id'],
): Promise<void> => {
  const response = await fetch(`/api/course/lesson/${courseId}/reorder`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Failed to change lesosn's order");
};
