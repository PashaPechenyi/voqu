import { LessonListItem } from '../types/lessonListItem.type';

export const deleteLessonReq = async (lessonId: LessonListItem['id']): Promise<void> => {
  const response = await fetch(`/api/course/lesson/${lessonId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
};
