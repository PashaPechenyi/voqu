import { useState } from 'react';
import { updateCourseReq } from '@/features/courses/helpers/updateCourseReq.helper';
import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '@/features/courses/types/courseReqBody.type';

type UseUpdateCourseProps = {
  onSuccess?: (updatedCourse: Course) => void;
  onError?: (error: unknown) => void;
};
export const useUpdateCourse = ({ onSuccess, onError }: UseUpdateCourseProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const updateCourse = async (courseId: Course['id'], body: CourseReqBody) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateCourseReq(courseId, body);
      onSuccess?.(result.course);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCourse, isLoading, error };
};
