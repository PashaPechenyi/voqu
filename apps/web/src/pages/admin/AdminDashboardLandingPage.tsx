import { Box } from '@mui/material';
import DBHeroSection from './admin-dashboard-sections/DBHeroSection';
import DBQuickActionsSection from './admin-dashboard-sections/DBQuickActionsSection';
import DBStatisticsSection from './admin-dashboard-sections/DBStatisticsSection';
import DBStatsActivitySection from './admin-dashboard-sections/DBStatsActivitySection';

export default function AdminDashboardLandingPage() {
  return (
    <Box>
      <DBHeroSection />
      <DBStatisticsSection />
      <DBStatsActivitySection />
      <DBQuickActionsSection />
    </Box>
  );
}
