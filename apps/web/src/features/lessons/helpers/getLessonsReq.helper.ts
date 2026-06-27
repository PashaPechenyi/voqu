import { httpClient } from '@/shared/api';
import { LessonListItem } from '../types/lesson.type';
import { CreateLessonReqBody } from '../types/createLessonReqBody.type';

export type GetLessonsDTO = { items: LessonListItem[] };

// export const getLessonsReq = async (courseId: string): Promise<GetLessonsDTO> => {
//   const response = await fetch(`/api/course/lesson/${courseId}/list`, { method: 'GET' });
//   if (!response.ok) throw new Error("Can't get lessons");
//   return response.json();
// };
export const getLessonsReq = (courseId: string) => {
  return httpClient.get<GetLessonsDTO>(`/course/lesson/${courseId}/list`);
};
