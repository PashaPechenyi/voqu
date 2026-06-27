import { LessonListItem } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';

export const editLessonReq = async (
  lessonId: LessonListItem['id'],
  body: LessonFormValues,
): Promise<void> => {
  const response = await fetch(`/api/course/lesson/${lessonId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Failed to update lesson');
};
