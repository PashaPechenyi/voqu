import { useCallback, useState } from 'react';
import getCourses from '@/features/courses/helpers/getCourses';
import { Course } from '@/features/courses/types/course.type';

const useGetCourses = () => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  const fetchCourses = useCallback(async () => {
    const result = await getCourses();
    if (!result) return;
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

export default useGetCourses;
