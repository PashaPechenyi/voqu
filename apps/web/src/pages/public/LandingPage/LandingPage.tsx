import { Divider } from '@mui/material';
import FuturesSection from './sections/FuturesSection';
import HeroSection from './sections/HeroSection';
import LessonPreviewSection from './sections/LessonPreviewSection';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FuturesSection />
      <LessonPreviewSection />
    </>
  );
}
