// TODO: File name says `useGetCourses.ts` but the hook is named `useCourses`. Pick one — rename the function to `useGetCourses` to match the file.
// TODO: Imports `Course` from `pages/admin/adminCourses/...` (page-local). A feature-level hook must not depend on a page-local type. Move `Course` into `features/courses/types/`.
// TODO: No `isLoading` / `error` state. Consumers can't render skeletons or error UI.
// TODO: Returns BOTH `setCoursesData` (raw setter) AND `updateCourse` / `addCoursesToTheList` (helpers). Pick one mode — exposing the raw setState defeats the encapsulation the helpers provide.
// TODO: This hook is invoked once per page via `useEffect(() => fetchCourses(), [])`. Consider switching to a query-cache library (TanStack Query / SWR) — the project will need cache invalidation as soon as Add/Edit/Delete are wired up.
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
