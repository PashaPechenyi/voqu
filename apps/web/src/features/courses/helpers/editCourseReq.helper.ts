import { httpClient } from '@/shared/api';
import { Course } from '../types/course.type';
import { EditCourseReqBody } from '../types/courseRequest.type';

// export const editCourseReq = async (id: Course['id'], body: EditCourseReqBody): Promise<void> => {
//   const response = await fetch(`/api/course/${id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });
//   if (!response.ok) throw new Error('Failed to edit course');
// };

export const editCourseReq = async (id: Course['id'], body: EditCourseReqBody) => {
  return httpClient.patch(`/course/${id}`, JSON.stringify(body));
};
