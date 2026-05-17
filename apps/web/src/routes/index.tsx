import { Routes, Route } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout/Public.layout';
import AdminLayout from '@/layouts/AdminLayout/Admin.layout';
import LandingPage from '@/pages/public/landing/Landing.page';
import AboutUsPage from '@/pages/public/aboutUs/AboutUs.page';
import AdminDashboardPage from '@/pages/admin/adminDashboard/AdminDashboard.page';
import AdminCoursesPage from '@/pages/admin/adminCourses/AdminCourses.page';
import EditCoursePage from '@/pages/admin/editCourse/EditCourse.page';
import {
  ABOUT_URL,
  ADMIN_URL,
  ADMIN_COURSES_URL,
  ADMIN_COURSES_EDIT_URL,
  HOME_URL,
} from '@/shared/constants/urls.const';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_URL} element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path={ABOUT_URL} element={<PublicLayout />}>
        <Route index element={<AboutUsPage />} />
      </Route>
      <Route path={ADMIN_URL} element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path={ADMIN_COURSES_URL} element={<AdminCoursesPage />} />
        <Route path={ADMIN_COURSES_EDIT_URL(':courseId')} element={<EditCoursePage />} />
      </Route>
    </Routes>
  );
}
