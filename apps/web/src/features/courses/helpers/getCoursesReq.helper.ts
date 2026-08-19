import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';

export type GetCoursesResponse = { items: Course[] };

export const getCoursesReq = async () => {
  return httpClient.get<GetCoursesResponse>(`/course`);
};
