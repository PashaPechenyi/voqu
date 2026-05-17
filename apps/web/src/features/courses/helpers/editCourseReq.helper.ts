import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

export type EditCourseResponse = {
  course: Course;
};

export const editCourseReq = async (
  courseId: Course['id'],
  body: CourseReqBody,
): Promise<EditCourseResponse> => {
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
