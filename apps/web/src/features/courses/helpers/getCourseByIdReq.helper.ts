import { Course } from '@/features/courses/types/course.type';

export type GetCourseByIdResponse = {
  course: Course;
};

export const getCourseByIdReq = async (
  courseId: Course['id'],
): Promise<GetCourseByIdResponse> => {
  const response = await fetch(`/api/course/${courseId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
