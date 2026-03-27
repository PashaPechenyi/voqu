import VocabularyCard from '@/components/vocabulary/VocabularyCard';
import { createSxStylesList } from '@/theme/helpers';
import { Box, Chip, Typography } from '@mui/material';
import { TEST } from '@/consts/lessonPrevievData';
import QuizSlider from '@/components/vocabulary/QuizSlider';

export default function LessonPreviewSection() {
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
        <VocabularyCard />
        <QuizSlider testData={TEST} />
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
