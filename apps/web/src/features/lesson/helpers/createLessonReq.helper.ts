import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';
import { LessonReqBody } from '../types/lessonReqBody.type';

export type CreateLessonDTO = {
  lesson: LessonListItem;
};

export const createLessonReq = (courseId: Course['id'], body: LessonReqBody) => {
  return httpClient.post<CreateLessonDTO>(`/course/lesson/${courseId}`, JSON.stringify(body));
};
