import { httpClient } from '@/shared/api';
import { CreateLessonReqBody } from '../types/createLessonReqBody.type';

export const createLessonReq = async (courseId: string, body: CreateLessonReqBody) => {
  return httpClient.post(`/course/lesson/${courseId}`, body);
};
