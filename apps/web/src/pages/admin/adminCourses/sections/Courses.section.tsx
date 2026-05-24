import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import CourseCard from '@/features/courses/components/CourseCard/CourseCard';
import { Course } from '@/features/courses/types/course.type';
type CoursesSectionProps = {
  coursesList: Course[];
  onSuccess: () => void;
};
function CoursesSection({ coursesList, onSuccess }: CoursesSectionProps) {
  return (
    <Box sx={sxStyles.root}>
      <Grid container spacing={2}>
        {coursesList.map((course) => (
          <Grid size={4}>
            <CourseCard onSuccess={onSuccess} key={course.id} course={course} />
          </Grid>
        ))}
      </Grid>
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
