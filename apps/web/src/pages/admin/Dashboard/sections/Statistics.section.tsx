import PopularCoursesCard from '@/features/courses/components/PopularCoursesCard';
import StatisticsCard from '@/features/statistics/components/StatisticsCard';
import { Box } from '@mui/material';

function StatisticsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
      <StatisticsCard />
      <PopularCoursesCard />
    </Box>
  );
}

export default StatisticsPage;
