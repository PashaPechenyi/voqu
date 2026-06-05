import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from './../../../../../api/src/modules/lesson/structs/lesson-list-item.constructor';

export type GetLessonsResponse = {
  items: LessonListItem[];
};

export const getLessonsReq = async (courseId: Course['id']): Promise<GetLessonsResponse> => {
  const response = await fetch(`/api/course/lesson/${courseId}/list`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
