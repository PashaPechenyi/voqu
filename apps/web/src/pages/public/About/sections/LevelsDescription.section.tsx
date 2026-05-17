import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import LevelsAccordion from '@/features/levels/components/LevelsAccordion';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const LevelsDescriptionSection: FC = () => {
  return (
    <>
      <Box sx={sxStyles.main}>
        <Typography variant="h4">CEFR Proficiency Levels</Typography>
        <Typography variant="body1" color="primary">
          The Common European Framework of Reference provides a standardized way to measure
          language proficiency. Explore each level to understand your current standing and plan
          your learning path.
        </Typography>
      </Box>
      <LevelsAccordion />
    </>
  );
};

const sxStyles = createSxStylesList({
  main: {
    display: 'flex',
    py: '30px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    gap: '40px',
    width: { xs: 1, md: '65%' },
    margin: '0 auto',
  },
});

export default LevelsDescriptionSection;
