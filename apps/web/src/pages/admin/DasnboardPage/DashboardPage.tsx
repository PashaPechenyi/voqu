import AdminHeader from '@/components/adminLayout/AdminHeader';
import React from 'react';
import SummarySection from './sections/SummarySection';
import QuickActions from './sections/QuickActions';
import StatisticsPage from './sections/StatisticsPage';

function DashboardPage() {
  return (
    <>
      <AdminHeader />
      <SummarySection />
      <StatisticsPage />
      <QuickActions />
    </>
  );
}

export default DashboardPage;
