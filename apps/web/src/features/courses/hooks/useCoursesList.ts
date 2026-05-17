import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { getCoursesReq } from '../helpers/getCourses.helper';

type UseCoursesListOptions = {
  onSuccess?: (coursesList: Course[]) => void;
  onError?: (error: Error) => void;
};

export const useCoursesList = ({ onSuccess, onError }: UseCoursesListOptions = {}) => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getCoursesReq();
      setCoursesList(result.items);
      onSuccess?.(result.items);
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Unknown error');
      setError(e);
      onError?.(e);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess, onError]);

  return { coursesList, fetchCourses, isLoading, error, setCoursesList };
};
