import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';
import { LessonReqBody } from '../types/lessonReqBody.type';

// RENAME: CreateLessonResponse -> CreateLessonDTO - API-response types end with DTO
export type CreateLessonDTO = {
  lesson: LessonListItem;
};

export const createLessonReq = async (
  courseId: Course['id'],
  body: LessonReqBody,
): Promise<CreateLessonDTO> => {
  const response = await fetch(`/api/course/lesson/${courseId}`, {
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
