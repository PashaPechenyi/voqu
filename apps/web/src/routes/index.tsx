// TODO: There is no catch-all `<Route path="*" element={<NotFound />} />` — unknown URLs render a blank page.
// TODO: `AdminCoursesLayout` is imported but it is actually a page, not a layout (`AdminCourses.page.tsx`). Either rename the file/component to `AdminCoursesPage` or move it to `layouts/` if it is genuinely a layout. The name and file path must agree.
// TODO: Admin routes have no auth guard. Wrap with a `<RequireAuth>` / `<ProtectedRoute>` before any of these endpoints touch real data.
// TODO: `LandingPage` is rendered at both `/` and effectively also inside `<PublicLayout>` for `/about` — fine, but consolidate so a single `<Route path="/" element={<PublicLayout/>}>` wraps all public child routes with `<Route path="about" element={<AboutUsPage/>} />` rather than duplicating the `<PublicLayout />` mount.
// TODO: `AdminLandingPage` is imported from `dashboard/Dashboard.page` — alias the import to `DashboardPage` to match the component's own name; the local rename only adds confusion.
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
        <Route path={ADMIN_COURSES_EDIT_URL(':courseId')} element={<EditCoursePage />} />
      </Route>
    </Routes>
  );
}
