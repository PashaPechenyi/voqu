import { FC } from 'react';
import IntroSection from './sections/Intro.section';
import LevelsDescriptionSection from './sections/LevelsDescription.section';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import LessonStructureSection from './sections/LessonStructure.section';

const AboutPage: FC = () => {
  return (
    <>
      <IntroSection />
      <SectionDivider />
      <LevelsDescriptionSection />
      <SectionDivider />
      <LessonStructureSection />
    </>
  );
};

export default AboutPage;
