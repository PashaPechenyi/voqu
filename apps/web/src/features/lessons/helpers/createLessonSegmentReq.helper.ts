import { httpClient } from '@/shared/api';
import { CreateLessonSegmentReqBody } from '../types/createLessonSegmentReqBody.type';

export const creaLessonSegmentReq = async (
  LessonId: string,
  body: CreateLessonSegmentReqBody,
  lang: string,
) => {
  return httpClient.post(`/lesson/segment/${LessonId}?lang=${lang}`, body);
};
