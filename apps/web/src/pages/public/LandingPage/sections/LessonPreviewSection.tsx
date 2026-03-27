import { Box, Button, Typography } from '@mui/material';
import VocabularyCard from '@/components/publicLayout/VocabularyCard';
import QuizSlider from '@/components/publicLayout/QuizSlider';
import TrialLessonCard from '@/components/publicLayout/TrialLessonCard';
import SectionDevider from '@/components/publicLayout/SectionDevider';

function LessonPreviewSection() {
  return (
    <>
      <SectionDevider />
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
