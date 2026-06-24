import { LessonListItem } from './../../../../../api/src/modules/lesson/structs/lesson-list-item.constructor';
import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';
export type GetLessonsDTO = {
  items: LessonListItem[];
  success?: true;
};
export const getLessonsReq = (courseId: Course['id']) => {
  return httpClient.get<GetLessonsDTO>(`/course/lesson/${courseId}/list`);
};
