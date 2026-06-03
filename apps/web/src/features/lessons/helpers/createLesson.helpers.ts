import { CreateLessonReqBody } from '../types/createLessonReqBodo.type';

export const createLessonReq = async (body: CreateLessonReqBody): Promise<void> => {
  const response = await fetch('/api/lesson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Failed to create lesson');
};
