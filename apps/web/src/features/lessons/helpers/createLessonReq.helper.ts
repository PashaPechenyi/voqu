import { httpClient } from '@/shared/api';
import { CreateLessonReqBody } from '../types/createLessonReqBody.type';

// export const createLessonReq = async (
//   courseId: string,
//   body: CreateLessonReqBody,
// ): Promise<void> => {
//   const response = await fetch(`/api/course/lesson/${courseId}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });
//   if (!response.ok) throw new Error('Failed to create lesson');
// };

export const createLessonReq = async (courseId: string, body: CreateLessonReqBody) => {
  return httpClient.post(`/course/lesson/${courseId}`, body);
};
