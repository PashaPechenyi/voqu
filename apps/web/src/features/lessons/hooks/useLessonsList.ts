import { useCallback, useState } from 'react';
import { LessonListItem } from '../types/lesson.type';
import { Course } from '@/features/courses/types/course.type';
import { getLessonsReq } from '../helpers/getLessonsReq.helper';

// RENAME: useLessonsListProps -> UseLessonsListProps - type names are PascalCase
type UseLessonsListProps = {
  onSuccess?: (lessonsList: LessonListItem[]) => void;
  onError?: (error: Error) => void;
};

export const useLessonsList = ({ onError, onSuccess }: UseLessonsListProps = {}) => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const getLessons = useCallback(
    async (courseId: Course['id']) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getLessonsReq(courseId);
        setLessonsList(result.items);
        onSuccess?.(result.items);
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
  return { getLessons, lessonsList, isLoading, error };
};
