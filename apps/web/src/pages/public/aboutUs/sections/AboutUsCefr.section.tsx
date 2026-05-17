// TODO: `expanded`/`setExpanded` here are passed to `<AboutUsCefrAccordionSection>` but that child shadows them with its own local state — so the centralized control here doesn't work. Either (a) drop the local state here and let the children own theirs, or (b) drop the local state inside the child and keep this as the single source of truth.
// TODO: `<Box sx={sxStyles.root as any}>` — `as any` is forbidden. Fix the sx typing.
// TODO: `{cefrLevels.map((item, index) => <AboutUsCefrAccordionSection key={index} ...>)}` — use `item.id` for the key.
// TODO: This section file co-exists with `AboutUsCefrAccordion.section.tsx`. They are tightly coupled, so consider moving the accordion into a local `components/` folder under the page (`pages/public/aboutUs/components/`) instead of a sibling `.section.tsx` — `.section.tsx` is for page-level slot fillers, not list items.
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { cefrLevels } from '@/features/levels/constants/cefrLevels.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import AboutUsCefrAccordionSection from './AboutUsCefrAccordion.section';

function AboutUsCefrSection() {
  const [expanded, setExpanded] = useState<number | false>(false);
  return (
    <Box sx={sxStyles.root as any}>
      <Typography variant="h4">CEFR Proficiency Levels</Typography>
      <Typography variant="body1" color="primary">
        The Common European Framework of Reference provides a standardized way to measure language
        proficiency. Explore each level to understand your current standing and plan your learning
        path.
      </Typography>
      <Box>
        {cefrLevels.map((item, index) => (
          <AboutUsCefrAccordionSection
            key={index}
            accordion={item}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </Box>
    </Box>
  );
}
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    gap: 3,
  },
});

export default AboutUsCefrSection;
