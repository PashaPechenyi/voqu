import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/components/publicLayout/PublicLayout';
import { LandingPage } from '@/pages/public/LandingPage/LandingPage';
import AboutPage from '@/pages/public/AboutPage/AboutPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
       <Route index element={<LandingPage />} />
      <Route index element={<AboutPage />} />
     
        
        
      
      </Route>
    </Routes>
  );
}
