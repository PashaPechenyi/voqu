import { httpClient } from '@/shared/api';

export const deleteLessonReq = async (lessonId: string) => {
  return httpClient.delete(`/course/lesson/${lessonId}/`);
};
