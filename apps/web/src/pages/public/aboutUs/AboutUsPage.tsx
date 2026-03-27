import SectionDivider from '@/components/SectionDivider';
import { Box } from '@mui/material';
import AboutUsCefrSection from './sections/AboutUsCefrSection';
import AboutUsIntroSection from './sections/AboutUsIntroSection';
import AboutUsMethodologySection from './sections/AboutUsMethodologySection';

export default function AboutUsPage() {
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
