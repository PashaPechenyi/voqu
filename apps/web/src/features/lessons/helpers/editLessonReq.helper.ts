import { httpClient } from '@/shared/api';
import { LessonListItem } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';

export const editLessonReq = async (lessonId: LessonListItem['id'], body: LessonFormValues) => {
  return httpClient.patch(`/course/lesson/${lessonId}`, body);
};
