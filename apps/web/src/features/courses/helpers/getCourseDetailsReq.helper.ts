import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';

export type GetCourseDetailsDTO = {
  course: Course;
  success?: true;
};

export const getCourseDetailsReq = async (courseId: Course['id']) => {
  return httpClient.get<GetCourseDetailsDTO>(`/course/${courseId}`);
};
