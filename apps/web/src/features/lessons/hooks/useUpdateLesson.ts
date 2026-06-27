import { useCallback, useState } from 'react';
import { LessonListItem } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';
import { editLessonReq } from '../helpers/editLessonReq.helpers';

type UseUpdateLessonOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const UseUpdateLesson = ({ onSuccess, onError }: UseUpdateLessonOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateLesson = useCallback(
    async (id: LessonListItem['id'], body: LessonFormValues) => {
      setIsLoading(true);
      setError(null);
      try {
        await editLessonReq(id, body);
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

  return { updateLesson, isLoading, error };
};
