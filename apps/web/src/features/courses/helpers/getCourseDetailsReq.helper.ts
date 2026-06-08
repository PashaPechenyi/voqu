import { Course } from '@/features/courses/types/course.type';

// RENAME: GetCourseByIdResponse -> GetCourseByIdDTO (API-response types end with DTO) -> GetCourseDetailsDTO (matches getCourseDetailsReq)
export type GetCourseDetailsDTO = {
  course: Course;
};

// RENAME: getCourseByIdReq -> getCourseDetailsReq - this endpoint returns full course details
export const getCourseDetailsReq = async (courseId: Course['id']): Promise<GetCourseDetailsDTO> => {
  const response = await fetch(`/api/course/${courseId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
