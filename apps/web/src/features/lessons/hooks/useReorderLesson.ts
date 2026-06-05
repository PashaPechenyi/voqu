import { useCallback, useState } from 'react';
import { CreateLessonReqBody } from '../types/createLessonReqBodo.type';
import { createLessonReq } from '../helpers/createLesson.helpers';
import { changeLessonOrder } from '../helpers/changeLessonOrder.helpers';
import { LessonListItem } from '../types/lesson.type';
import { Course } from '@/features/courses/types/course.type';

type useReorderLessonProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
export const useReorderLesson = ({ onError, onSuccess }: useReorderLessonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const reorderLesson = useCallback(
    async (lessons: LessonListItem[], courseId: Course['id']) => {
      setIsLoading(true);
      setError(null);
      try {
        const orderedLessonsList = lessons.map((lesson, ind) => ({
          LessonId: lesson.id,
          order: ind,
        }));
        await changeLessonOrder({ items: orderedLessonsList }, courseId);
        onSuccess?.();
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Unknown error');
        setError(e);
        onError?.(e);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError],
  );
  return { reorderLesson, isLoading, error };
};
