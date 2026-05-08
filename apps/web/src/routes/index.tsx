import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout';
import { LandingPage } from '@/pages/public/Landing/Landing.page';
import AboutPage from '@/pages/public/About/About.page';
import DashboardPage from '@/pages/admin/Dashboard/Dashboard.page';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import Courses from '@/pages/admin/Courses/Courses';
import CourseDetails from '@/pages/admin/CourseDetails/CourseDetails';
import { about, admin, course, courseEdit, landingPage } from './constants/urls.constant';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={landingPage} element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path={about} index element={<AboutPage />} />
      </Route>
      <Route path={admin} element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path={course} index element={<Courses />} />
        <Route path={courseEdit} index element={<CourseDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/landingPage" replace />} />
    </Routes>
  );
}
