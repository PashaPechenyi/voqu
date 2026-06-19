import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { EditCourseReqBody } from '../types/courseRequest.type';
import { editCourseReq } from '../helpers/editCourseReq.helper';

type UseEditCourseOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useEditCourse = ({ onSuccess, onError }: UseEditCourseOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const editCourse = useCallback(
    async (id: Course['id'], body: EditCourseReqBody) => {
      setIsLoading(true);
      setError(null);
      try {
        await editCourseReq(id, body);
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

  return { editCourse, isLoading, error };
};
