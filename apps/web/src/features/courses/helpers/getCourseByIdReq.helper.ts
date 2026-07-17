import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';

export type GetCourseResponse = { course: Course };

export const getCourseByIdReq = async (id: Course['id']) => {
  return httpClient.get<GetCourseResponse>(`/course/${id}`);
};
