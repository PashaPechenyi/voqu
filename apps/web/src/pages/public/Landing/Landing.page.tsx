import { FC } from 'react';
import HeroSection from './sections/Hero.section';
import FeaturesSection from './sections/Features.section';
import LessonPreviewSection from './sections/LessonPreview.section';

const LandingPage: FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <LessonPreviewSection />
    </>
  );
};

export default LandingPage;
