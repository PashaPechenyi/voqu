import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { getCourseByIdReq } from '../helpers/getCourseByIdReq.helper';
import { useMutation } from '@/shared/api';

type UseCourseByIdOptions = {
  onSuccess?: (course: Course) => void;
  onError?: (error: Error) => void;
};

export const useCourseById = ({}: UseCourseByIdOptions = {}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const { mutate: fetchCourseById } = useMutation({
    mutationFn: getCourseByIdReq,
    onSuccess: (result) => setCourse(result.course),
  });
  return { course, setCourse, fetchCourseById };
};
