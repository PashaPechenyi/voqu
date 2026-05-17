import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { getCourseByIdReq } from '../helpers/getCourseById.helper';

type UseCourseByIdOptions = {
  onSuccess?: (course: Course) => void;
  onError?: (error: Error) => void;
};

export const useCourseById = ({ onSuccess, onError }: UseCourseByIdOptions = {}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourseById = useCallback(
    async (id: Course['id']) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCourseByIdReq(id);
        setCourse(result.course);
        onSuccess?.(result.course);
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

  return { course, setCourse, fetchCourseById, isLoading, error };
};
