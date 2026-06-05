import { useCallback, useState } from 'react';
import { deleteLessonReq } from '../helpers/deleteLesson.helpers';

type useDeleteLessonProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
export const useDeleteLesson = ({ onError, onSuccess }: useDeleteLessonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const deleteLesson = useCallback(
    async (lessonId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await deleteLessonReq(lessonId);
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
  return { deleteLesson, isLoading, error };
};
