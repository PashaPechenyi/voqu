import { Box, Grid } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import CourseCard from '@/features/courses/components/CourseCard/CourseCard';
import { Course } from '@/features/courses/types/course.type';

type CoursesSectionProps = {
  coursesList: Course[];
  onUpdateSuccess: () => void;
};

function CoursesSection({ coursesList, onUpdateSuccess }: CoursesSectionProps) {
  return (
    <Box sx={sxStyles.root}>
      <Grid container spacing={2}>
        {coursesList.map((course) => (
          <Grid key={course.id} size={{ xs: 6, md: 4 }}>
            <CourseCard onUpdateSuccess={onUpdateSuccess} course={course} />
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
