import { FC } from 'react';
import SummarySection from './sections/Summary.section';
import QuickActionsSection from './sections/QuickActions.section';
import StatisticsSection from './sections/Statistics.section';

const DashboardPage: FC = () => {
  return (
    <>
      <SummarySection />
      <StatisticsSection />
      <QuickActionsSection />
    </>
  );
};

export default DashboardPage;
