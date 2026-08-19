import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';
import { EditCourseReqBody } from '../types/courseRequest.type';

export const editCourseReq = async (id: Course['id'], body: EditCourseReqBody) => {
  return httpClient.patch(`/course/${id}`, body);
};
