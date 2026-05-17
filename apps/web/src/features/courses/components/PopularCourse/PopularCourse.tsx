import { Box, LinearProgress, Typography } from '@mui/material';

import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { PopularCourse as PopularCourseData } from '../../types/popularCourse.type';

type PopularCourseProps = {
  data: PopularCourseData;
};

function PopularCourse({ data }: PopularCourseProps) {
  return (
    <Box sx={sxStyles.recentItem}>
      <Typography variant="body1">{data.name}</Typography>
      <Typography color="primary" variant="body2">
        {data.students} students enrolled
      </Typography>
      <Box sx={sxStyles.progressRow}>
        <LinearProgress variant="determinate" value={data.completion} sx={sxStyles.progress} />
        <Typography color="primary">{data.completion}%</Typography>
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
