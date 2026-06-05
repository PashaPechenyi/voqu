import { useState } from 'react';
import { deleteLessonReq } from '../helpers/deleteLessonReq.helper';
import { LessonListItem } from '../types/lessonListItem.type';

type UseDeleteLessonProps = {
  onSuccess?: (lessonId: LessonListItem['id']) => void;
  onError?: (error: unknown) => void;
};

export const useDeleteLesson = ({ onSuccess, onError }: UseDeleteLessonProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const deleteLesson = async (lessonId: LessonListItem['id']) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteLessonReq(lessonId);
      onSuccess?.(lessonId);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteLesson, isLoading, error };
};
