import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';

export type ReorderLessonDTO = {
  lesson: LessonListItem;
  success?: true;
};
export type ReorderLessonReqBody = {
  items: {
    LessonId: LessonListItem['id'];
    order: LessonListItem['order'];
  }[];
};

export const reorderLessonReq = async (courseId: Course['id'], body: ReorderLessonReqBody) => {
  return httpClient.patch<ReorderLessonDTO>(
    `/course/lesson/${courseId}/reorder`,
    JSON.stringify(body),
  );
};
