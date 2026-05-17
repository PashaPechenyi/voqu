import { FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CourseCard from '@/features/courses/components/CourseCard';
import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import { CourseStatusFilterValue } from '@/features/search/constants/courseStatusFilterOptions.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Course } from '@/features/courses/types/course.type';

type CoursesSectionProps = {
  enteredValue: string;
  statusFilter: CourseStatusFilterValue;
};

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

const CoursesSection: FC<CoursesSectionProps> = ({ enteredValue, statusFilter }) => {
  const { coursesList, fetchCourses, isLoading, error } = useCoursesList();

  // TODO: fetch once on mount; fetchCourses' identity depends on onSuccess/onError,
  // so listing it as a dep would refire the request whenever those callbacks change.
  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = filterCourses(coursesList, enteredValue, statusFilter);

  return (
    <Box sx={sxStyles.root}>
      {isLoading && <Typography>Loading…</Typography>}
      {error && <Typography color="error">Failed to load courses.</Typography>}
      {!isLoading && !error && visible.length === 0 && (
        <Typography color="primary">No courses found.</Typography>
      )}
      {visible.map((course) => (
        <CourseCard key={course.id} course={course} onStatusChanged={fetchCourses} />
      ))}
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    width: 1,
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    mt: '40px',
  },
});

export default CoursesSection;
