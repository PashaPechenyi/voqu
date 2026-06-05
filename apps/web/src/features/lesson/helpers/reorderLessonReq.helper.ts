import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';

export type ReorderLessonResponse = {
  lesson: LessonListItem;
};
export type ReorderLessonReqBody = {
  items: {
    LessonId: LessonListItem['id'];
    order: LessonListItem['order'];
  }[];
};

export const reorderLessonReq = async (
  courseId: Course['id'],
  body: ReorderLessonReqBody,
): Promise<ReorderLessonResponse> => {
  const response = await fetch(`/api/course/lesson/${courseId}/reorder`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
