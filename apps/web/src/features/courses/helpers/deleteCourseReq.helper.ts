import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';

export const deleteCourseReq = async (id: Course['id']) => {
  return httpClient.delete(`/course/${id}`);
};
