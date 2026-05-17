import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import VocabularyCard from '@/features/vocabulary/components/VocabularyCard';
import Quiz from '@/features/quiz/components/Quiz';
import LessonCtaCard from '@/features/lessons/components/LessonCtaCard';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const LessonPreviewSection: FC = () => {
  return (
    <>
      <Box sx={sxStyles.header}>
        <Box sx={sxStyles.headerCopy}>
          <Typography variant="h3">Vocabulary Lesson Preview</Typography>
          <Typography color="primary" variant="body1">
            Experience our interactive vocabulary lessons designed to enhance your English mastery.
            Each lesson combines detailed definitions, pronunciation guides, and engaging quizzes.
          </Typography>
        </Box>
      </Box>
      <Box sx={sxStyles.cardsRow}>
        <VocabularyCard />
        <Quiz />
      </Box>
      <LessonCtaCard />
    </>
  );
};

const sxStyles = createSxStylesList({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: '50px',
    gap: '30px',
  },
  headerCopy: { width: { xs: 1, md: '70%' }, textAlign: 'center' },
  cardsRow: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: '20px',
  },
});

export default LessonPreviewSection;
