import { LessonListItem } from '../types/lessonListItem.type';
import { LessonReqBody } from '../types/lessonReqBody.type';

export type CreateLessonResponse = {
  lesson: LessonListItem;
};

export const createLessonReq = async (body: LessonReqBody): Promise<CreateLessonResponse> => {
  const response = await fetch('/api/lesson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
