import { Course } from '@/features/courses/types/course.type';
import { httpClient } from '@/shared/api';

export type ReorderLessonsReqBody = {
  items: {
    LessonId: string;
    order: number;
  }[];
};

export const reorderLessonsReq = async (body: ReorderLessonsReqBody, courseId: Course['id']) => {
  return httpClient.patch(`/course/lesson/${courseId}/reorder`, body);
};
