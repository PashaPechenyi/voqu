import { Box } from '@mui/material';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import AboutUsCefrSection from './sections/AboutUsCefr.section';
import AboutUsIntroSection from './sections/AboutUsIntro.section';
import AboutUsMethodologySection from './sections/AboutUsMethodology.section';

function AboutUsPage() {
  return (
    <Box>
      <AboutUsIntroSection />
      <SectionDivider />
      <AboutUsCefrSection />
      <SectionDivider />
      <AboutUsMethodologySection />
    </Box>
  );
}

export default AboutUsPage;
