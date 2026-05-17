import { Box, Chip, Typography } from '@mui/material';
import VocabularyCardsSlider from '@/features/vocabulary/components/VocabularyCardsSlider/VocabularyCardsSlider';
import QuizSlider from '@/shared/components/QuizSlider/QuizSlider';
import { VOCABULARY_ENTRIES } from '@/features/vocabulary/constants/vocabularyEntries.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { QUIZ_ENTRIES_LIST } from '../constants/quizEntries.const';

function LessonPreviewSection() {
  return (
    <Box sx={sxStyles.root} mt={10} mb={6}>
      <Box sx={sxStyles.titles}>
        <Typography variant="h3" component="h1" gutterBottom>
          Вивчай англійську крок за кроком
        </Typography>
        <Typography variant="h5" color="text.disabled">
          Структуровані уроки від початківця до просунутого рівня для українців
        </Typography>
      </Box>
      <Box sx={sxStyles.mainCard}>
        <Chip label="A1" size="small" />
        <Typography variant="h6">First lesson</Typography>
        <Typography variant="body2">Basic words</Typography>
      </Box>

      <Box sx={sxStyles.lessonBox}>
        <VocabularyCardsSlider cards={VOCABULARY_ENTRIES} />
        <QuizSlider quizEntries={QUIZ_ENTRIES_LIST} />
      </Box>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  titles: {
    textAlign: 'center',
  },
  mainCard: {
    width: '90%',
    backgroundColor: 'secondary.main',
    mt: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  lessonBox: (theme) => ({
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
    mt: 2,
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  }),
});

export default LessonPreviewSection;
