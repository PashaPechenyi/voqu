import getCourses from '@/features/courses/helpers/getCourses';
import { Course } from '@/pages/admin/adminCourses/types/course.type';

import { useState } from 'react';
const useCourses = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const fetchCourses = async () => {
    const course = await getCourses();
    if (!course) return;
    setCoursesData(course.items);
  };
  const updateCourse = (course: Course) => {
    setCoursesData((prev) => {
      return prev.map((item) => {
        if (item.id !== course.id) return item;
        return course;
      });
    });
  };
  const addCoursesToTheList = (course: Course) => {
    setCoursesData((prev) => [course, ...prev]);
  };
  return { coursesData, fetchCourses, updateCourse, setCoursesData, addCoursesToTheList };
};

export default useCourses;
