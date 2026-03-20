import { Routes, Route, createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { LandingPage } from '@/pages/public/landing/LandingPage';
import AboutUsPage from '@/pages/public/aboutUs/AboutUsPage';
import TablePage from '@/pages/public/table/TablePage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/about" element={<PublicLayout />}>
        <Route index element={<AboutUsPage />} />
      </Route>
      <Route path="/table" element={<PublicLayout />}>
        <Route index element={<TablePage />} />
      </Route>
    </Routes>
  );
}
