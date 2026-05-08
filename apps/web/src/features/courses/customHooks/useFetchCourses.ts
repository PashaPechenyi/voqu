import { Course } from '@/pages/admin/Courses/sections/CoursesSection';
import { useState } from 'react';

const useFetchCourses = () => {
  const [coursesList, setCoursesList] = useState<Course[] | []>([]);
  async function getCoursesReq() {
    const response = await fetch('http://localhost:5173/api/course', {
      method: 'GET',
    });
    const result = await response.json();
    console.log(result, 'resultCourses');
    return result;
  }

  function getCourses() {
    getCoursesReq().then((response) => {
      setCoursesList(response.items);
    });
  }
  return { getCourses, coursesList };
};

export default useFetchCourses;
