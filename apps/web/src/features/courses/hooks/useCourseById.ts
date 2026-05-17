import { useCallback, useState } from 'react';
import { getCourseByIdReq } from '@/features/courses/helpers/getCourseByIdReq.helper';
import { Course } from '@/features/courses/types/course.type';

export const useCourseById = () => {
  const [course, setCourse] = useState<Course | null>(null);

  const fetchCourseById = useCallback(async (courseId: Course['id']) => {
    const result = await getCourseByIdReq(courseId);
    setCourse(result.course);
  }, []);

  return { course, setCourse, fetchCourseById };
};
