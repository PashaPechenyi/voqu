import { FC, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CourseCard from '@/features/courses/components/CourseCard';
import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import { CourseStatusFilterValue } from '@/features/search/constants/courseStatusFilterOptions.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Course } from '@/features/courses/types/course.type';

type CoursesSectionProps = {
  coursesList: Course[];
  refetchCourses: () => void;
};

const CoursesSection: FC<CoursesSectionProps> = ({ coursesList, refetchCourses }) => {
  // TODO: fetch once on mount; fetchCourses' identity depends on onSuccess/onError,
  // so listing it as a dep would refire the request whenever those callbacks change.

  return (
    <Box sx={sxStyles.root}>
      <Grid container spacing={2}>
        {coursesList.map((course) => (
          <Grid key={course.id} size={4} sx={sxStyles.gridItem}>
            <CourseCard course={course} onStatusChanged={refetchCourses} />
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
