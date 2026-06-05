import { useCallback, useState } from 'react';
import { LessonListItem } from '../types/lesson.type';
// import { getLessonReq } from '../helpers/getLessonReq.helpers';
import { Course } from '@/features/courses/types/course.type';
import { getLessonReq } from '../helpers/getLessonReq.helpers';

type useLessonsListProps = {
  onSuccess?: (lessonsList: LessonListItem[]) => void;
  onError?: (error: Error) => void;
};
export const useLessonsList = ({ onError, onSuccess }: useLessonsListProps = {}) => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  console.log(lessonsList, '555');
  const getLessons = useCallback(
    async (courseId: Course['id']) => {
      console.log(333);
      setIsLoading(true);
      setError(null);
      try {
        const result = await getLessonReq(courseId);
        console.log(result, 4444);
        setLessonsList(result.items);
        onSuccess?.(result.items);
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
  return { getLessons, lessonsList, isLoading, error, setLessonsList };
};
