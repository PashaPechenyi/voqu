import { Box, Typography } from '@mui/material';
import React from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import RadarIcon from '@mui/icons-material/Radar';
import { Card } from '@/models/types';
import LessonStructurePhase from '@/components/publicLayout/LessonStructurePhase';

const Cards: Card[] = [
  {
    icon: ImportContactsIcon,
    title: 'Vocabulary Introduction',
    description: 'Learn new words with definitions, pronunciation guides, and real-world examples',
  },
  {
    icon: RadarIcon,
    title: 'Interactive Practice',
    description: 'Engage with quizzes, matching exercises, and fill-in-the-blank activities',
  },
  {
    icon: RadarIcon,
    title: 'Conversation Application',
    description: 'Use new vocabulary in context through dialogue practice and role-play scenarios',
  },
  {
    icon: RadarIcon,
    title: 'Assessment & Review',
    description: 'Test your understanding and receive personalized feedback on your progress',
  },
];
function LessonStructure() {
  return (
    <Box>
      <Box sx={styles.main}>
        <Typography variant="h4">How Our Lessons Work</Typography>
        <Typography variant="body1" color="primary" sx={{ mb: 5, width: '65%' }}>
          Every Voqu lesson follows a proven 4-step methodology designed to maximize retention and
          ensure you can confidently use what you learn in real-world situations.
        </Typography>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {Cards.map((card, ind) => (
            <LessonStructurePhase
              title={card.title}
              phaseNumber={ind}
              icon={card.icon}
              description={card.description}
            />
          ))}
        </Box>
      </Box>
    </Box>
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

    margin: '0 auto',
  },
};
export default LessonStructure;
