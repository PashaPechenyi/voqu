import { useCallback, useState } from 'react';
import { reorderLessonsReq } from '../helpers/reorderLessonsReq.helper';
import { LessonListItem } from '../types/lesson.type';
import { Course } from '@/features/courses/types/course.type';

// RENAME: useReorderLessonProps -> UseReorderLessonsProps - type names are PascalCase; reorder acts on the whole list (plural)
type UseReorderLessonsProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

// RENAME: useReorderLesson -> useReorderLessons - the hook reorders the whole lessons list
export const useReorderLessons = ({ onError, onSuccess }: UseReorderLessonsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // RENAME: reorderLesson -> reorderLessons - operates on the whole list
  const reorderLessons = useCallback(
    async (lessons: LessonListItem[], courseId: Course['id']) => {
      setIsLoading(true);
      setError(null);
      try {
        const orderedLessonsList = lessons.map((lesson, index) => ({
          LessonId: lesson.id,
          order: index,
        }));
        await reorderLessonsReq({ items: orderedLessonsList }, courseId);
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
  return { reorderLessons, isLoading, error };
};
