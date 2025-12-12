import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { LandingPage } from '@/pages/public/LandingPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  );
}
