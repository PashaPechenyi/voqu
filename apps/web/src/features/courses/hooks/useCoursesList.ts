import { useCallback, useState } from 'react';
import { Course } from '../types/course.type';
import { getCoursesReq } from '../helpers/getCoursesReq.helper';
import { useMutation } from '@/shared/api';

type UseCoursesListOptions = {
  onSuccess?: (coursesList: Course[]) => void;
  onError?: (error: Error) => void;
};

export const useCoursesList = ({}: UseCoursesListOptions = {}) => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  const { mutate: fetchCourses } = useMutation({
    mutationFn: getCoursesReq,
    onSuccess: (result) => setCoursesList(result.items),
  });
  return { coursesList, fetchCourses, setCoursesList };
};
