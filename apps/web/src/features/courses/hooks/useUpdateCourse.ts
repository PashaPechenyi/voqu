import { useState } from 'react';
import { updateCourseReq } from '@/features/courses/helpers/updateCourseReq.helper';
import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '@/features/courses/types/courseReqBody.type';

// RENAME: UseEditCourseProps -> UseUpdateCourseProps - 'update' is the canonical mutation verb
type UseUpdateCourseProps = {
  onSuccess?: (updatedCourse: Course) => void;
  onError?: (error: unknown) => void;
};

// RENAME: useEditCourse -> useUpdateCourse - 'update' is the canonical mutation verb
export const useUpdateCourse = ({ onSuccess, onError }: UseUpdateCourseProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  // RENAME: editCourse -> updateCourse - 'update' is the canonical mutation verb
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
