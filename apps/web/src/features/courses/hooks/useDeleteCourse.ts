import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { deleteCourseReq } from '../helpers/deleteCourseReq.helper';

type UseDeleteCourseOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useDeleteCourse = ({ onSuccess, onError }: UseDeleteCourseOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteCourse = useCallback(
    async (id: Course['id']) => {
      setIsLoading(true);
      setError(null);
      try {
        await deleteCourseReq(id);
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

  return { deleteCourse, isLoading, error };
};
