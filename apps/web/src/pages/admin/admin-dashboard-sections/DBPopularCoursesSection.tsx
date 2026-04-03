import { createSxStylesList } from '@/theme/helpers';
import { Box, Card, CardContent, CardHeader, Slider, Typography } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { popularCourses } from '@/consts/adminConsts/dbPopularCourses';

export default function DBPopularCoursesSection() {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader
        avatar={<ShowChartIcon />}
        title={<Typography variant="h5">Popular Courses</Typography>}
      />
      <CardContent>
        {popularCourses.map((item) => (
          <>
            <Box sx={sxStyles.recentItem}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography color={'primary'} variant="body2">
                {item.students} students enrolled
              </Typography>
              <Typography color={'primary'} sx={sxStyles.typography}>
                <Slider slots={{ thumb: 'noindex' }} disabled defaultValue={item.completion} />
                {item.completion}%
              </Typography>
            </Box>
          </>
        ))}
      </CardContent>
    </Card>
  );
}

const sxStyles = createSxStylesList({
  card: {
    width: '50%',
    border: '2px solid',
    borderColor: 'adminSecondary.main',
  },
  typography: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    gap: 1,
  },
  recentItem: {
    p: 1,
  },
});
