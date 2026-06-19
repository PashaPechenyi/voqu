import { useCallback, useState } from 'react';
import { CreateLessonReqBody } from '../types/createLessonReqBody.type';
import { createLessonReq } from '../helpers/createLessonReq.helper';

// RENAME: useCreateLessonProps -> UseCreateLessonProps - type names are PascalCase
type UseCreateLessonProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useCreateLesson = ({ onError, onSuccess }: UseCreateLessonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const createLesson = useCallback(
    async (courseId: string, body: CreateLessonReqBody) => {
      setIsLoading(true);
      setError(null);
      try {
        await createLessonReq(courseId, body);
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
  return { createLesson, isLoading, error };
};
