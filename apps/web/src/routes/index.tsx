import PublicLayout from '@/layouts/PublicLayout/Public.layout';
import AdminLayout from '@/layouts/AdminLayout/Admin.layout';
import LandingPage from '@/pages/public/landing/Landing.page';
import AboutUsPage from '@/pages/public/aboutUs/AboutUs.page';
import AdminLandingPage from '@/pages/admin/dashboard/Dashboard.page';
import { Routes, Route } from 'react-router-dom';
import AdminCoursesLayout from '@/pages/admin/AdminCoursesLayout';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutUsPage />} />
        {/* <Route path="/admin" index element={<DashboardPage />} /> */}
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLandingPage />} />
        <Route path="courses" element={<AdminCoursesLayout />} />
      </Route>
    </Routes>
  );
}
