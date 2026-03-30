import { Box, Typography } from '@mui/material';
import VocabularyCard from '@/features/vocabulary/components/VocabularyCard';
import QuizSlider from '@/features/quiz/components/QuizSlider';
import TrialLessonCard from '@/features/lessons/components/TrialLessonCard';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';

function LessonPreviewSection() {
  return (
    <>
      <SectionDivider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: '50px',
          gap: '30px',
        }}
      >
        <Box sx={{ width: { xs: 1, md: '70%' }, textAlign: 'center' }}>
          <Typography variant="h3">Vocabulary Lesson Preview</Typography>
          <Typography color="primary" variant="body1">
            Experience our interactive vocabulary lessons designed to enhance your English mastery.
            Each lesson combines detailed definitions, pronunciation guides, and engaging quizzes.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
        <VocabularyCard />
        <QuizSlider />
      </Box>

      <TrialLessonCard />
    </>
  );
}

export default LessonPreviewSection;
