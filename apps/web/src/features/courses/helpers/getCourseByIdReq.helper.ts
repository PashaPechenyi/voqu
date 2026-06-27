import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';

export type GetCourseResponse = { course: Course };

// export const getCourseByIdReq = async (id: Course['id']): Promise<GetCourseResponse> => {
//   const response = await fetch(`/api/course/${id}`, { method: 'GET' });
//   if (!response.ok) throw new Error('Failed to fetch course');
//   return response.json();
// };
export const getCourseByIdReq = async (id: Course['id']) => {
  return httpClient.get<GetCourseResponse>(`/course/${id}`);
};
