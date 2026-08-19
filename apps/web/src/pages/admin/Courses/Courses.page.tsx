import { FC, useEffect, useState } from 'react';
import IntroSection from './sections/Intro.section';
import CoursesSection from './sections/Courses.section';
import { CourseStatusFilterValue } from '@/features/search/constants/courseStatusFilterOptions.const';
import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import { Typography } from '@mui/material';
import { Course } from '@/features/courses/types/course.type';

const filterCourses = (
  courses: Course[],
  search: string,
  statusFilter: CourseStatusFilterValue,
): Course[] =>
  courses.filter((course) => {
    const matchesSearch =
      search.length === 0 || course.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

const CoursesPage: FC = () => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<CourseStatusFilterValue>('all');
  // TODO: useCoursesList no longer returns isLoading/error, so these are always undefined and the loading/error branches below never render (type error). Surface loading/error via useMutation state in the hook.
  const { coursesList, fetchCourses, isLoading, error } = useCoursesList();
  const visibleCoursesList = filterCourses(coursesList, enteredValue, statusFilter);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IntroSection
        onSearchChange={setEnteredValue}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCourseCreated={fetchCourses}
      />
      {isLoading && (
        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>Loading…</Typography>
      )}
      {error && <Typography color="error">Failed to load courses.</Typography>}
      {!isLoading && !error && visibleCoursesList.length === 0 && (
        <Typography color="primary">No courses found.</Typography>
      )}
      {!!visibleCoursesList.length && (
        <CoursesSection reloadCourses={fetchCourses} coursesList={visibleCoursesList} />
      )}
    </>
  );
};

export default CoursesPage;
