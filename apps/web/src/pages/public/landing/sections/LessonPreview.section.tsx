// TODO: Lots of unused sxStyles (`word`, `definition`, `example`, `card`) — those look copy-pasted from `VocabularyCardsSlider`. Remove dead styles.
// TODO: Title text duplicates `Hero.section.tsx` (same "Вивчай англійську крок за кроком" headline + identical subtitle). Either intentional emphasis (then it should be one shared component) or accidental copy-paste (then change one).
// TODO: `<Chip label="A1" size="small" />` is hardcoded — the demo lesson's level should come from data, not be hardcoded as `A1`.
// TODO: Section file mixes two unrelated demos (vocabulary slider + quiz) inside `mainCard`. The `mainCard` header text ("First lesson / Basic words") only describes the vocabulary part — the quiz placement is unexplained UX.
import { Box, Chip, Typography } from '@mui/material';
import VocabularyCardsSlider from '@/features/vocabulary/components/VocabularyCardsSlider/VocabularyCardsSlider';
import QuizSlider from '@/shared/components/QuizSlider/QuizSlider';
import { VOCABULARY_ENTRIES } from '@/features/vocabulary/constants/vocabularyEntries.const';
import { QUIZ_ENTRIES_LIST } from '../constants/quizEntries.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

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
        <QuizSlider quizEntriesList={QUIZ_ENTRIES_LIST} />
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
  word: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  definition: (theme) => ({
    textAlign: 'left',

    [theme.breakpoints.up('sm')]: {
      m: 1,
    },
    [theme.breakpoints.up('md')]: {
      m: 2,
    },
  }),
  example: (theme) => ({
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      m: 1,
    },
    [theme.breakpoints.up('md')]: {
      m: 2,
    },
  }),
  mainCard: {
    width: '90%',

    backgroundColor: 'secondary.main',
    mt: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    width: '50%',
    m: 2,
    minHeight: '600px',
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
