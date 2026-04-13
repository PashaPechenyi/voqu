import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import FuturesSection from './sections/Futures.section';
import HeroSection from './sections/Hero.section';
import LessonPreviewSection from './sections/LessonPreview.section';

function LandingPage() {
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

export default LandingPage;
