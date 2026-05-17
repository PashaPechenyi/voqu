import { useCallback, useState } from 'react';
import { CreateCourseReqBody } from '../types/courseRequest.type';
import { createCourseReq } from '../helpers/createCourse.helper';

type UseCreateCourseOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useCreateCourse = ({ onSuccess, onError }: UseCreateCourseOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCourse = useCallback(
    async (body: CreateCourseReqBody) => {
      setIsLoading(true);
      setError(null);
      try {
        await createCourseReq(body);
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

  return { createCourse, isLoading, error };
};
