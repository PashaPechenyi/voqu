import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

export type UpdateCourseDTO = {
  course: Course;
};

export const updateCourseReq = async (
  courseId: Course['id'],
  body: CourseReqBody,
): Promise<UpdateCourseDTO> => {
  const response = await fetch(`/api/course/${courseId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
