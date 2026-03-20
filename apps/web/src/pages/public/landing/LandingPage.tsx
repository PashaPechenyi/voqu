import SectionDivider from '@/components/SectionDivider';

import FuturesSection from './sections/FuturesSection';
import HeroSection from './sections/HeroSection';
import LessonPreviewSection from './sections/LessonPreviewSection';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <FuturesSection />
      <SectionDivider />
      <LessonPreviewSection />
      <SectionDivider />
    </>
  );
}
