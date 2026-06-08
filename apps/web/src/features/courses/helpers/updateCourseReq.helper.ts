import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

// RENAME: EditCourseResponse -> UpdateCourseDTO - 'update' is the canonical mutation verb; API-response types end with DTO
export type UpdateCourseDTO = {
  course: Course;
};

// RENAME: editCourseReq -> updateCourseReq - 'update' is the canonical mutation verb
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
