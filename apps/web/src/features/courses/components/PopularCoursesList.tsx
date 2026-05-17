import { FC } from 'react';
import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type PopularCourse = {
  id: string;
  name: string;
  studentsAmount: number;
  percent: number;
};

const MOCK_POPULAR_COURSES: PopularCourse[] = [
  { id: 'pc1', name: 'English Grammar Essentials', studentsAmount: 342, percent: 72 },
  { id: 'pc2', name: 'Advanced Vocabulary Builder', studentsAmount: 289, percent: 65 },
  { id: 'pc3', name: 'Everyday Conversations', studentsAmount: 256, percent: 81 },
  { id: 'pc4', name: 'Listening Comprehension', studentsAmount: 198, percent: 58 },
];

const PopularCoursesList: FC = () => {
  return (
    <Card sx={sxStyles.card}>
      <CardContent sx={sxStyles.content}>
        <Box sx={sxStyles.titleRow}>
          <TrendingUpIcon fontSize="large" sx={sxStyles.titleIcon} />
          <Typography variant="h4">Popular Courses</Typography>
        </Box>
        <Box sx={sxStyles.list}>
          {MOCK_POPULAR_COURSES.map((course) => (
            <Box key={course.id} sx={sxStyles.item}>
              <Typography color="secondary" variant="body3">
                {course.name}
              </Typography>
              <Typography variant="body1" color="primary">
                {course.studentsAmount} students enrolled
              </Typography>
              <Box sx={sxStyles.progressRow}>
                <LinearProgress
                  variant="determinate"
                  value={course.percent}
                  sx={sxStyles.progress}
                />
                <Typography variant="body1" color="primary">
                  {course.percent}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: (theme) => ({
    width: { xs: 1, md: '50%' },
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    py: '20px',
    mt: '30px',
  }),
  content: { px: '20px', mt: '20px' },
  titleRow: { display: 'flex', gap: '10px', alignItems: 'center', pb: '30px' },
  titleIcon: (theme) => ({ fill: theme.palette.divider }),
  list: { display: 'flex', gap: '20px', mt: '13px', flexDirection: 'column' },
  item: { display: 'flex', flexDirection: 'column', gap: '5px', py: '10px' },
  progressRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center',
  },
  progress: { flex: 1, height: 6, borderRadius: 3 },
});

export default PopularCoursesList;
