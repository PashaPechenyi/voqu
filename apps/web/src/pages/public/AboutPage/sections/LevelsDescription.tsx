// TODO: DELETE — part of the stale `AboutPage/` duplicate page. The canonical version is `pages/public/aboutUs/sections/AboutUsCefr.section.tsx`.
// TODO: `import CustomizedAccordions from '@/components/publicLayout/Accordion'` — path does not exist.
// TODO: `AccordionSummary` imported from `@mui/material` is unused.
// TODO: File missing `.section.tsx` suffix used elsewhere in the project for page-local sections.
// TODO: Uses a plain object literal `const styles = { main: { ... } }` instead of the project's `createSxStylesList` helper — inconsistent styling pattern.
import CustomizedAccordions from '@/components/publicLayout/Accordion';
import { AccordionSummary, Box, Typography } from '@mui/material';

function LevelsDescription() {
  return (
    <>
      <Box sx={styles.main}>
        <Typography variant="h4">CEFR Proficiency Levels</Typography>
        <Typography variant="body1" color="primary">
          The Common European Framework of Reference provides a standardized way to measure language
          proficiency. Explore each level to understand your current standing and plan your learning
          path.
        </Typography>
      </Box>
      <CustomizedAccordions />
    </>
  );
}
const styles = {
  main: {
    display: 'flex',
    py: '30px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    gap: '40px',
    width: '65%',
    margin: '0 auto',
  },
};

export default LevelsDescription;
