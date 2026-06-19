import { CreateCourseReqBody } from '../types/courseRequest.type';

export const createCourseReq = async (body: CreateCourseReqBody): Promise<void> => {
  const response = await fetch('/api/course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Failed to create course');
};
