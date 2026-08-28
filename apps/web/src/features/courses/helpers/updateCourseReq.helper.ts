import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

export type UpdateCourseDTO = {
  course: Course;
  success?: true;
};

export const updateCourseReq = async (courseId: Course['id'], body: CourseReqBody) => {
  return httpClient.patch<UpdateCourseDTO>(`/course/${courseId}`, JSON.stringify(body));
};
