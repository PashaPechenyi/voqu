import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

type CreateCourseDTO = {
  course: Course;
};

export const createCourseReq = async (body: CourseReqBody): Promise<CreateCourseDTO> => {
  const response = await fetch('/api/course', {
    method: 'POST',
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
