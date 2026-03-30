import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/publicLayout/PublicLayout';
import { LandingPage } from '@/pages/public/LandingPage/LandingPage';
import AboutPage from '@/pages/public/AboutPage/AboutPage';
import DashboardPage from '@/pages/admin/DasnboardPage/DashboardPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="landingPage" index element={<LandingPage />} />
        <Route path="/about" index element={<AboutPage />} />
        <Route path="/admin" index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
