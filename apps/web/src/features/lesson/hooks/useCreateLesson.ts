import { useState } from 'react';
import { Lesson } from '../types/lesson.type';
import { LessonReqBody } from '../types/lessonReqBody.type';
import { createLessonReq } from '../helpers/createLessonReq.helper';

type UseCreateLessonProps = {
  onSuccess?: (createdLesson: Lesson) => void;
  onError?: (error: unknown) => void;
};

export const useCreateLesson = ({ onSuccess, onError }: UseCreateLessonProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const createLesson = async (body: LessonReqBody) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createLessonReq(body);
      onSuccess?.(result.lesson);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createLesson, isLoading, error };
};
