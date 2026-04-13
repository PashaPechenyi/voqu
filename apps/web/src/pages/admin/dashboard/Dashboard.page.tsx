import { Box } from '@mui/material';
import DashboardHeroSection from './sections/DashboardHero.section';
import DashboardQuickActionsSection from './sections/DashboardQuickActions.section';
import DashboardStatisticsSection from './sections/DashboardStatistics.section';
import DashboardStatsActivitySection from './sections/DashboardStatsActivity.section';

function DashboardPage() {
  return (
    <Box>
      <DashboardHeroSection />
      <DashboardStatisticsSection />
      <DashboardStatsActivitySection />
      <DashboardQuickActionsSection />
    </Box>
  );
}

export default DashboardPage;
