import StatisticsCard from '@/features/progress/components/StatisticsCard';
import { Box } from '@mui/material';

function StatisticsPage() {
  return (
    <Box sx={{ width: 1, display: 'flex', gap: '10px' }}>
      <StatisticsCard />
    </Box>
  );
}

export default StatisticsPage;
