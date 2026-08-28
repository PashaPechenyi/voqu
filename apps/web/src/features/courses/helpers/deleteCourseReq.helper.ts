import { httpClient } from './../../../shared/api/httpClient';
import { Course } from '@/features/courses/types/course.type';

export const deleteCourseReq = async (courseId: Course['id']) => {
  return httpClient.delete<void>(`/course/${courseId}`);
};
