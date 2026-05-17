import { useEffect } from 'react';
import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import CourseCard from '@/features/courses/components/CourseCard/CourseCard';

function CoursesSection() {
  const { coursesList, fetchCourses } = useCoursesList();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <Box sx={sxStyles.root}>
      {coursesList.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'start',
  },
});

export default CoursesSection;
