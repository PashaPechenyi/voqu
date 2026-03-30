import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout';
import { LandingPage } from '@/pages/public/Landing/Landing.page';
import AboutPage from '@/pages/public/About/About.page';
import DashboardPage from '@/pages/admin/Dashboard/Dashboard.page';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      {/* FIXME: PublicLayout should be used only for public pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="landingPage" index element={<LandingPage />} />
        <Route path="/about" index element={<AboutPage />} />
        <Route path="/admin" index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
