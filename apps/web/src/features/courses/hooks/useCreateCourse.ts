import { useState } from 'react';
import { createCourseReq } from '@/features/courses/helpers/createCourseReq.helper';
import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '@/features/courses/types/courseReqBody.type';

type UseCreateCourseProps = {
  onSuccess?: (createdCourse: Course) => void;
  onError?: (error: unknown) => void;
};

export const useCreateCourse = ({ onSuccess, onError }: UseCreateCourseProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const createCourse = async (body: CourseReqBody) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createCourseReq(body);
      onSuccess?.(result.course);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createCourse, isLoading, error };
};
