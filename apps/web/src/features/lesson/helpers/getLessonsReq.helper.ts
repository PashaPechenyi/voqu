import { LessonListItem } from './../../../../../api/src/modules/lesson/structs/lesson-list-item.constructor';
import { Lesson } from '../types/lesson.type';

export type GetLessonsResponse = {
  items: LessonListItem[];
};

export const getLessonsReq = async (): Promise<GetLessonsResponse> => {
  const response = await fetch('/api/lesson', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
