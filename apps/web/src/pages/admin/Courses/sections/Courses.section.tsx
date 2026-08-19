import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import CourseCard from '@/features/courses/components/CourseCard';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Course } from '@/features/courses/types/course.type';

type CoursesSectionProps = {
  coursesList: Course[];
  reloadCourses: () => void;
};

const CoursesSection: FC<CoursesSectionProps> = ({ coursesList, reloadCourses }) => {
  return (
    <Box sx={sxStyles.root}>
      <Grid container spacing={2}>
        {coursesList.map((course) => (
          <Grid key={course.id} size={4} sx={sxStyles.gridItem}>
            <CourseCard course={course} onStatusChanged={reloadCourses} />
          </Grid>
        ))}
      </Grid>
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
  gridItem: {
    display: 'flex',
  },
});

export default CoursesSection;
