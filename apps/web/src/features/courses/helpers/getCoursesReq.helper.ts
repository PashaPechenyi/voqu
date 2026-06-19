import { Course } from '@/features/courses/types/course.type';

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
