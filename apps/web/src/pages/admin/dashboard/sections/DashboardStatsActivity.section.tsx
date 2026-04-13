import { Box } from '@mui/material';

import DashboardRecentActivitySection from './DashboardRecentActivity.section';
import DashboardPopularCoursesSection from './DashboardPopularCourses.section';

function DashboardStatsActivitySection() {
  return (
    <Box mb={10} sx={{ display: 'flex', flexDirection: 'row' }}>
      <DashboardRecentActivitySection />
      <DashboardPopularCoursesSection />
    </Box>
  );
}

export default DashboardStatsActivitySection;
