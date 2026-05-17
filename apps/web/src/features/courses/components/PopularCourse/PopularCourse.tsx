import { Box, LinearProgress, Typography } from '@mui/material';

import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { PopularCourse as TPopularCourse } from '../../types/popularCourse.type';

type PopularCourseProps = {
  course: TPopularCourse;
};

function PopularCourse({ course }: PopularCourseProps) {
  return (
    <Box sx={sxStyles.recentItem}>
      <Typography variant="body1">{course.name}</Typography>
      <Typography color="primary" variant="body2">
        {course.students} students enrolled
      </Typography>
      <Box sx={sxStyles.progressRow}>
        <LinearProgress variant="determinate" value={course.completion} sx={sxStyles.progress} />
        <Typography color="primary">{course.completion}%</Typography>
      </Box>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  recentItem: {
    p: 1,
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  progress: {
    flex: 1,
  },
});

export default PopularCourse;
