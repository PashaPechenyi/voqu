import { LessonListItem } from '../types/lesson.type';

// RENAME: GetLessonResponse -> GetLessonsDTO - response payload types use the DTO suffix
export type GetLessonsDTO = { items: LessonListItem[] };

// RENAME: getLessonReq -> getLessonsReq - fetches a list; *Req helper named <verb><Entity>Req
export const getLessonsReq = async (courseId: string): Promise<GetLessonsDTO> => {
  const response = await fetch(`/api/course/lesson/${courseId}/list`, { method: 'GET' });
  if (!response.ok) throw new Error("Can't get lessons");
  return response.json();
};
