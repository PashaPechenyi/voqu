import { httpClient } from './../../../shared/api/httpClient';
import { LessonListItem } from '../types/lessonListItem.type';

export const deleteLessonReq = (lessonId: LessonListItem['id']) => {
  return httpClient.delete<void>(`/course/lesson/${lessonId}`);
};
