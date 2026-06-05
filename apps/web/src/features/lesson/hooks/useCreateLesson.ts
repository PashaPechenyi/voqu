import { useState } from 'react';
import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';
import { LessonReqBody } from '../types/lessonReqBody.type';
import { createLessonReq } from '../helpers/createLessonReq.helper';

type UseCreateLessonProps = {
  onSuccess?: (createdLesson: LessonListItem) => void;
  onError?: (error: unknown) => void;
};

export const useCreateLesson = ({ onSuccess, onError }: UseCreateLessonProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const createLesson = async (courseId: Course['id'], body: LessonReqBody) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createLessonReq(courseId, body);
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
