import { httpClient } from '@/shared/api';
import { CreateCourseReqBody } from '../types/courseRequest.type';

export const createCourseReq = async (body: CreateCourseReqBody) => {
  return httpClient.post('/course', body);
};
