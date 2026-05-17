import { useState } from 'react';
import { deleteCourseReq } from '@/features/courses/helpers/deleteCourseReq.helper';
import { Course } from '@/features/courses/types/course.type';

type UseDeleteCourseProps = {
  onSuccess?: (courseId: Course['id']) => void;
  onError?: (error: unknown) => void;
};

export const useDeleteCourse = ({ onSuccess, onError }: UseDeleteCourseProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const deleteCourse = async (courseId: Course['id']) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteCourseReq(courseId);
      onSuccess?.(courseId);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCourse, isLoading, error };
};
