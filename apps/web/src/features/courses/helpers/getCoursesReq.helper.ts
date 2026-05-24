import { Course } from '@/features/courses/types/course.type';
import { responsiveProperty } from '@mui/material/styles/cssUtils';

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

// function handleResponse(route1: string, obj: any) {
//   const response = fetch(route1, obj);
//   if (!response.ok) {
//     throw new Error('Something went wrong...');
//   }
//   return response.json();
// }

// handleResponce('', { method: 'GET' });
