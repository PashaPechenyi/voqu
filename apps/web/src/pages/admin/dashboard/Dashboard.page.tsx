// TODO: `<Box>` wrapper with no styling adds a DOM node for no reason — use a fragment `<>...</>` if no styles are needed.
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
