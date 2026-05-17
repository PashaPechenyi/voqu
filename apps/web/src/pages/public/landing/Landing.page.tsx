// TODO: Component `LandingPage` has three `<SectionDivider />` siblings — extract a small `<DividedSections>` wrapper that injects dividers between children, so the page reads as a list of sections without divider noise.
// TODO: Trailing `<SectionDivider />` after `LessonPreviewSection` has nothing below it — likely intended to be removed (an open-ended divider looks broken).
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
