import { LessonListItem } from '../types/lesson.type';

export type GetLessonResponse = { items: LessonListItem[] };

export const getLessonReq = async (courseId: string): Promise<GetLessonResponse> => {
  const response = await fetch(`/api/lesson?CourseId=${courseId}`, { method: 'GET' });
  if (!response.ok) throw new Error("Can't get lessons");
  return response.json();
};
