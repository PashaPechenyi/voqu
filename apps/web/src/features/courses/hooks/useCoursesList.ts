import { useCallback, useState } from 'react';
import { getCoursesReq } from '@/features/courses/helpers/getCoursesReq.helper';
import { Course } from '@/features/courses/types/course.type';

export const useCoursesList = () => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  const fetchCourses = useCallback(async () => {
    const result = await getCoursesReq();
    setCoursesList(result.items);
  }, []);

  const updateCourseInList = (course: Course) => {
    setCoursesList((prev) => prev.map((item) => (item.id === course.id ? course : item)));
  };

  const addCourseToList = (course: Course) => {
    setCoursesList((prev) => [course, ...prev]);
  };

  return { coursesList, fetchCourses, updateCourseInList, addCourseToList };
};
