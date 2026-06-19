import { Course } from '@/features/courses/types/course.type';

export type GetCourseDetailsDTO = {
  course: Course;
};

export const getCourseDetailsReq = async (courseId: Course['id']): Promise<GetCourseDetailsDTO> => {
  const response = await fetch(`/api/course/${courseId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
