import { httpClient } from './../../../shared/api/httpClient';
import { LessonListItem } from '../types/lessonListItem.type';
import { LessonDetails } from '../types/lessonDetails.type';
export type GetLessonDetailsDTO = {
  lesson: LessonDetails;
  success?: true;
};
export const getLessonDetailsReq = (lessonId: LessonListItem['id']) => {
  return httpClient.get<GetLessonDetailsDTO>(`/course/lesson/${lessonId}/details?lang=uk`);
};
