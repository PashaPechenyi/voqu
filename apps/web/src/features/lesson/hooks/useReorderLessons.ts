import { Course } from '@/features/courses/types/course.type';
import { useState } from 'react';
import { reorderLessonReq } from '../helpers/reorderLessonReq.helper';
import { LessonListItem } from '../types/lessonListItem.type';

type UseReorderLessonsProps = {
  onSuccess?: (updatedLesson: LessonListItem) => void;
  onError?: (error: unknown) => void;
};

export const useReorderLessons = ({ onSuccess, onError }: UseReorderLessonsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const reorderLessons = async (lessons: LessonListItem[], course: Course) => {
    setIsLoading(true);
    setError(null);
    try {
      const formattedList = lessons.map((lessonItem, index) => ({
        LessonId: lessonItem.id,
        order: index,
      }));
      const result = await reorderLessonReq(course.id, { items: formattedList });
      onSuccess?.(result.lesson);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { reorderLessons, isLoading, error };
};
