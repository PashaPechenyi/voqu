import { useCallback, useState } from 'react';
import { CreateLessonReqBody } from '../types/createLessonReqBodo.type';
import { createLessonReq } from '../helpers/createLesson.helpers';

type useCreateLessonProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
export const useCreateLesson = ({ onError, onSuccess }: useCreateLessonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const createLesson = useCallback(
    async (body: CreateLessonReqBody) => {
      setIsLoading(true);
      setError(null);
      try {
        await createLessonReq(body);
        console.log(1111);
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
