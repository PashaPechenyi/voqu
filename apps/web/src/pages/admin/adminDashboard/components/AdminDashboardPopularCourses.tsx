import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { MOCK_POPULAR_COURSES } from '@/features/courses/constants/popularCourses.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import PopularCourse from '@/features/courses/components/PopularCourse/PopularCourse';

function AdminDashboardPopularCourses() {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader
        avatar={<ShowChartIcon />}
        title={<Typography variant="h5">Popular Courses</Typography>}
      />
      <CardContent>
        {MOCK_POPULAR_COURSES.map((course) => (
          <PopularCourse key={course.name} data={course} />
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
});

export default AdminDashboardPopularCourses;
