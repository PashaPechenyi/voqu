import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

type CreateCourseDTO = {
  course: Course;
  success?: true;
};

export const createCourseReq = async (body: CourseReqBody) => {
  return httpClient.post<CreateCourseDTO>('/course', JSON.stringify(body));
};
