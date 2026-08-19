import { httpClient } from '@/shared/api';
import { LessonListItem } from '../types/lesson.type';

export type GetLessonsDTO = { items: LessonListItem[] };

export const getLessonsReq = (courseId: string) => {
  return httpClient.get<GetLessonsDTO>(`/course/lesson/${courseId}/list`);
};
