import { Course } from '@/features/courses/types/course.type';

// RENAME: GetCoursesResponse -> GetCoursesDTO - API-response types end with DTO
export type GetCoursesDTO = {
  items: Course[];
};

export const getCoursesReq = async (): Promise<GetCoursesDTO> => {
  const response = await fetch('/api/course', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
