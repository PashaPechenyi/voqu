import { useCallback, useState } from 'react';
import getCourseById from '@/features/courses/helpers/getCourseById';
import { Course } from '@/features/courses/types/course.type';

const useGetCourseById = () => {
  const [course, setCourse] = useState<Course | null>(null);

  const fetchCourseById = useCallback(async (courseId: Course['id']) => {
    const result = await getCourseById(courseId);
    if (!result) return;
    setCourse(result.course);
  }, []);

  return { course, setCourse, fetchCourseById };
};

export default useGetCourseById;
