import PublicLayout from '@/layouts/PublicLayout/Public.layout';
import AdminLayout from '@/layouts/AdminLayout/Admin.layout';
import LandingPage from '@/pages/public/landing/Landing.page';
import AboutUsPage from '@/pages/public/aboutUs/AboutUs.page';
import AdminLandingPage from '@/pages/admin/dashboard/Dashboard.page';
import { Routes, Route } from 'react-router-dom';
import AdminCoursesLayout from '@/pages/admin/adminCourses/AdminCourses.page';
import {
  ABOUT_URL,
  ADMIN_URL,
  ADMIN_COURSES_URL,
  ADMIN_COURSES_EDIT_URL,
  HOME_URL,
} from '@/shared/constants/urls.const';
import EditCoursePage from '@/pages/admin/editCourse/EditCourse.page';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={HOME_URL} element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path={ABOUT_URL} element={<PublicLayout />}>
        <Route index element={<AboutUsPage />} />
      </Route>
      <Route path={ADMIN_URL} element={<AdminLayout />}>
        <Route index element={<AdminLandingPage />} />
        <Route path={ADMIN_COURSES_URL} element={<AdminCoursesLayout />} />
        <Route path={ADMIN_COURSES_EDIT_URL} element={<EditCoursePage />} />
      </Route>
    </Routes>
  );
}
