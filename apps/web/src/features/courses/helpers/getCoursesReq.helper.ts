import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';

export type GetCoursesResponse = { items: Course[] };

// export const getCoursesReq = async (): Promise<GetCoursesResponse> => {
//   const response = await fetch('/api/course', { method: 'GET' });
//   if (!response.ok) throw new Error('Failed to fetch courses');
//   return response.json();
// };
export const getCoursesReq = async () => {
  return httpClient.get<GetCoursesResponse>(`/course`);
};
