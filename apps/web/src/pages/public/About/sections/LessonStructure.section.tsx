import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import LessonStructurePhase from '@/features/lessons/components/LessonStructurePhase';
import { MOCK_LESSON_PHASES } from '@/features/lessons/constants/mockLessonPhases.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const LessonStructureSection: FC = () => {
  return (
    <Box>
      <Box sx={sxStyles.main}>
        <Typography variant="h4">How Our Lessons Work</Typography>
        <Typography variant="body1" color="primary" sx={sxStyles.copy}>
          Every Voqu lesson follows a proven 4-step methodology designed to maximize retention and
          ensure you can confidently use what you learn in real-world situations.
        </Typography>

        <Box sx={sxStyles.phaseList}>
          {MOCK_LESSON_PHASES.map((phase, index) => (
            <LessonStructurePhase
              key={phase.title}
              title={phase.title}
              phaseNumber={index}
              icon={phase.icon}
              description={phase.description}
            />
          ))}
        </Box>
      </Box>
    </Box>
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
    margin: '0 auto',
  },
  copy: { mb: 5, width: { xs: 1, md: '65%' } },
  phaseList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default LessonStructureSection;
