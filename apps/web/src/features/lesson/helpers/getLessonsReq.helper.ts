import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';

// RENAME: GetLessonsResponse -> GetLessonsDTO - API-response types end with DTO
export type GetLessonsDTO = {
  items: LessonListItem[];
};

export const getLessonsReq = async (courseId: Course['id']): Promise<GetLessonsDTO> => {
  const response = await fetch(`/api/course/lesson/${courseId}/list`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
