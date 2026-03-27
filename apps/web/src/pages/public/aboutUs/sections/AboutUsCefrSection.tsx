import { cefrLevels } from '@/consts/aboutUs';
import { createSxStylesList } from '@/theme/helpers';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AboutUsCefrAccordionSection from './AboutUsCefrAccordionSection';

export default function AboutUsCefrSection() {
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
