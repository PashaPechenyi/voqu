import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';

export type GetCoursesDTO = {
  items: Course[];
  success?: true;
};

export const getCoursesReq = async () => {
  return httpClient.get<GetCoursesDTO>('/course');
};
