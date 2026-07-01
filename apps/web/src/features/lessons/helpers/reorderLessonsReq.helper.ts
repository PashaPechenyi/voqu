import { Course } from '@/features/courses/types/course.type';
import { httpClient } from '@/shared/api';

export type ReorderLessonsReqBody = {
  items: {
    LessonId: string;
    order: number;
  }[];
};
// export const reorderLessonsReq = async (
//   body: ReorderLessonsReqBody,
//   courseId: Course['id'],
// ): Promise<void> => {
//   const response = await fetch(`/api/course/lesson/${courseId}/reorder`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });
//   if (!response.ok) throw new Error("Failed to change lesson's order");
// };
export const reorderLessonsReq = async (body: ReorderLessonsReqBody, courseId: Course['id']) => {
  return httpClient.patch(`/course/lesson/${courseId}/reorder`, body);
};
