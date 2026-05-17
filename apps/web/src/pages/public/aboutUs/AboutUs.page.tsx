// TODO: The page is also duplicated as `pages/public/AboutPage/AboutPage.tsx` (different folder, different content, broken imports). Decide which is canonical, delete the other. Per the convention `pages/<area>/<page>/<Page>.page.tsx` the camelCase `aboutUs/AboutUs.page.tsx` is the right one — delete `AboutPage/` entirely.
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
