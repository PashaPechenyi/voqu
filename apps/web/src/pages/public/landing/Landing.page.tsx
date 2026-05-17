import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import FeaturesSection from './sections/Features.section';
import HeroSection from './sections/Hero.section';
import LessonPreviewSection from './sections/LessonPreview.section';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <LessonPreviewSection />
    </>
  );
}

export default LandingPage;
