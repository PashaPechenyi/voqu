import { Box } from '@mui/material';
import DBPopularCoursesSection from './DBPopularCoursesSection';
import DBRecentActivitySection from './DBRecentActivitySection';

export default function DBStatsActivitySection() {
  return (
    <Box mb={10} sx={{ display: 'flex', flexDirection: 'row' }}>
      <DBRecentActivitySection />
      <DBPopularCoursesSection />
    </Box>
  );
}
