import { httpClient } from '@/shared/api';
import { LessonDetails } from '../types/lessonDetails.type';

export type GetLessonsDetailsDTO = { lesson: LessonDetails };

export const getLessonsDetailsReq = (lessonId: string) => {
  return httpClient.get<GetLessonsDetailsDTO>(`/course/lesson/${lessonId}/details?lang=uk`);
};
