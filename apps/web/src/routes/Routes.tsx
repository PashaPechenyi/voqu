import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout';
import LandingPage from '@/pages/public/Landing/Landing.page';
import AboutPage from '@/pages/public/About/About.page';
import NotFoundPage from '@/pages/public/NotFound/NotFound.page';
import DashboardPage from '@/pages/admin/Dashboard/Dashboard.page';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import CoursesPage from '@/pages/admin/Courses/Courses.page';
import CourseDetailsPage from '@/pages/admin/CourseDetails/CourseDetails.page';
import {
  ABOUT_URL,
  ADMIN_URL,
  ADMIN_COURSES_URL,
  ADMIN_COURSE_DETAILS_URL,
} from '@/shared/constants/urls.const';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path={ABOUT_URL} element={<AboutPage />} />
      </Route>
      <Route path={ADMIN_URL} element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path={ADMIN_COURSES_URL} element={<CoursesPage />} />
        <Route path={`${ADMIN_COURSE_DETAILS_URL(':courseId')}`} element={<CourseDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
