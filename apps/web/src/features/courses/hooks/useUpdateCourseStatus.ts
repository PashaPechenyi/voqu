import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { updateCourseStatusReq } from '../helpers/updateCourseStatus.helper';

type UseUpdateCourseStatusOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useUpdateCourseStatus = ({
  onSuccess,
  onError,
}: UseUpdateCourseStatusOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCourseStatus = useCallback(
    async (course: Course) => {
      setIsLoading(true);
      setError(null);
      try {
        await updateCourseStatusReq(course);
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

  return { updateCourseStatus, isLoading, error };
};
