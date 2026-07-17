import { useState } from 'react';
import { Course } from '../types/course.type';
import { getCoursesReq } from '../helpers/getCoursesReq.helper';
import { useMutation } from '@/shared/api';

type UseCoursesListOptions = {
  onSuccess?: (coursesList: Course[]) => void;
  onError?: (error: Error) => void;
};

// TODO: onSuccess and onError are not used in the hook
export const useCoursesList = ({ onSuccess, onError }: UseCoursesListOptions = {}) => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  const {
    isLoading,
    error,
    mutate: fetchCourses,
  } = useMutation({
    mutationFn: getCoursesReq,
    onSuccess: (result) => setCoursesList(result.items),
  });
  return { coursesList, fetchCourses, setCoursesList, isLoading, error };
};
