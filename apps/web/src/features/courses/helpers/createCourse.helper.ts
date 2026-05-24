import { CreateCourseReqBody } from '../types/courseRequest.type';

export const createCourseReq = async (body: CreateCourseReqBody): Promise<void> => {
  const response = await fetch('/api/course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Failed to create course');
};

// export async function createCourseReq<Tbody>(
//   way: string,
//   method: string,
//   body: Tbody,
//   headers: { 'Content-Type': string },
//   error: string,
//   id?: string,
// ) {
//   const response = await fetch(`${way}`, {
//     method: `${method}`,
//     headers: headers,
//     body: JSON.stringify(body),
//   });
//   if (!response.ok) throw new Error(`${error}`);
// }
