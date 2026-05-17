import AdminDashboardHeroSection from './sections/AdminDashboardHero.section';
import AdminDashboardQuickActionsSection from './sections/AdminDashboardQuickActions.section';
import AdminDashboardStatisticsSection from './sections/AdminDashboardStatistics.section';
import AdminDashboardStatsActivitySection from './sections/AdminDashboardStatsActivity.section';

function AdminDashboardPage() {
  return (
    <>
      <AdminDashboardHeroSection />
      <AdminDashboardStatisticsSection />
      <AdminDashboardStatsActivitySection />
      <AdminDashboardQuickActionsSection />
    </>
  );
}

export default AdminDashboardPage;
