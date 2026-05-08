import SummarySection from './sections/Summary.section';
import QuickActions from './sections/QuickActions.section';
import StatisticsPage from './sections/Statistics.section';

function DashboardPage() {
  return (
    <>
      <SummarySection />
      <StatisticsPage />
      <QuickActions />
    </>
  );
}

export default DashboardPage;
