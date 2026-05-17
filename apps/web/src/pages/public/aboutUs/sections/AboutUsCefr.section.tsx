import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CEFR_LEVELS } from '@/features/levels/constants/cefrLevels.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import AboutUsCefrAccordion from '../components/AboutUsCefrAccordion';

function AboutUsCefrSection() {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h4">CEFR Proficiency Levels</Typography>
      <Typography variant="body1" color="primary">
        The Common European Framework of Reference provides a standardized way to measure language
        proficiency. Explore each level to understand your current standing and plan your learning
        path.
      </Typography>
      <Box>
        {CEFR_LEVELS.map((cefrLevel) => (
          <AboutUsCefrAccordion
            key={cefrLevel.id}
            cefrLevel={cefrLevel}
            expanded={expanded}
            onExpandedChange={setExpanded}
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
