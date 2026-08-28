import { useMutation } from './../../../shared/api/useMutation';
import { useState } from 'react';
import { getCoursesReq } from '@/features/courses/helpers/getCoursesReq.helper';
import { Course } from '@/features/courses/types/course.type';

export const useCoursesList = () => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  const { mutate: getCoursesList } = useMutation({
    mutationFn: getCoursesReq,
    onSuccess(response) {
      setCoursesList(response.items);
    },
  });

  const updateCourseInList = (course: Course) => {
    setCoursesList((prev) => prev.map((item) => (item.id === course.id ? course : item)));
  };

  const addCourseToList = (course: Course) => {
    setCoursesList((prev) => [course, ...prev]);
  };

  return { coursesList, getCoursesList, updateCourseInList, addCourseToList };
};
