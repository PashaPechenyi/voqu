import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout';
import { LandingPage } from '@/pages/public/Landing/Landing.page';
import AboutPage from '@/pages/public/About/About.page';
import DashboardPage from '@/pages/admin/Dashboard/Dashboard.page';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import Courses from '@/pages/admin/Courses/Courses';
import EditLessons from '@/pages/admin/EditLessons/EditLessons';

export function AppRoutes() {
  return (
    <Routes>
      {/* TODO: create global constants file for urls */}

      <Route path="/landingPage" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/landingPage/about" index element={<AboutPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/admin/courses" index element={<Courses />} />
        <Route path="/admin/courses/:courseId/courseEdit" index element={<EditLessons />} />
      </Route>

      <Route path="*" element={<Navigate to="/landingPage" replace />} />
    </Routes>
  );
}
