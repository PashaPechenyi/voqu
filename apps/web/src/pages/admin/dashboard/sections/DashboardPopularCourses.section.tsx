// TODO: `popularCourses` is mock data. Wire to a real `/api/courses/popular` endpoint.
// TODO: `<PopularCourse ... />` is rendered without a `key` — React will warn. Use `item.name` (or a real id once added) as the key.
// TODO: `sxStyles.typography` and `sxStyles.recentItem` are declared but never used in this file. Dead styles — remove.
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
