import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useEffect } from 'react';

import { CourseCardSection } from './CourseCard.section';
import useGetCourses from '@/features/courses/hooks/useGetCourses';

export default function CoursesSection() {
  const { coursesData, fetchCourses } = useGetCourses();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Box sx={sxStyles.root}>
      {coursesData.map((courseData) => (
        <CourseCardSection key={courseData.id} courseData={courseData} />
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
