import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { popularCourses } from '@/features/courses/constants/dashboardPopularCourses.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import PopularCourse from '@/features/courses/components/PopularCourse/PopularCourse';

function DashboardPopularCoursesSection() {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader
        avatar={<ShowChartIcon />}
        title={<Typography variant="h5">Popular Courses</Typography>}
      />
      <CardContent>
        {popularCourses.map((item) => (
          <PopularCourse name={item.name} students={item.students} completion={item.completion} />
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

export default DashboardPopularCoursesSection;
