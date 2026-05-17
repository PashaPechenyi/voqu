import { Course } from '@/features/courses/types/course.type';

export type GetCoursesResponse = {
  items: Course[];
};

export const getCoursesReq = async (): Promise<GetCoursesResponse> => {
  const response = await fetch('/api/course', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
