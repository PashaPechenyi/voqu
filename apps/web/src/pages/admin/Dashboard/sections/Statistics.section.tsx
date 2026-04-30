import PopularCoursesCard from '@/features/progress/components/PopularCoursesCard';
import StatisticsCard from '@/features/progress/components/StatisticsCard';
import { Box } from '@mui/material';

function StatisticsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
      <StatisticsCard />
      <PopularCoursesCard/>
    </Box>
  );
}

export default StatisticsPage;
