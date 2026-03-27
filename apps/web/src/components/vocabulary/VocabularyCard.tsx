import { createSxStylesList } from '@/theme/helpers';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useState } from 'react';
import { PREVIEW_LESSON_CARDS } from '@/consts/lessonPrevievData';
import { PreviewLessonCard } from '@/models/models';

export default function VocabularyCard() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isTranlate, setIsTranlate] = useState(true);
  const card = PREVIEW_LESSON_CARDS[activeWordIndex];
  const next = () => {
    setIsTranlate(false);
    setActiveWordIndex((prev) => (prev === PREVIEW_LESSON_CARDS.length - 1 ? 0 : prev + 1));
  };
  const previous = () => {
    setIsTranlate(false);
    setActiveWordIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const getCurrentDataByLanuage = (card: PreviewLessonCard) => {
    return {
      word: isTranlate ? card.word : card.tr_word,
      definition: isTranlate ? card.description : card.tr_description,
      example: isTranlate ? card.example : card.tr_example,
    };
  };
  const wordToDisplay = getCurrentDataByLanuage(card);
  return (
    <Card sx={sxStyles.card} onClick={() => setIsTranlate((prev) => !prev)}>
      <CardHeader
        sx={sxStyles.word}
        action={
          <IconButton>
            <VolumeUpRoundedIcon fontSize="large" />
          </IconButton>
        }
        title={<Typography variant="h4">{wordToDisplay.word}</Typography>}
      />
      <Divider variant="middle" />
      <CardContent sx={sxStyles.cardContent}>
        <Box sx={sxStyles.definition}>
          <Typography>Definition</Typography>
          <Typography color="text.disabled">{wordToDisplay.definition}</Typography>
        </Box>

        <Box sx={sxStyles.example}>
          <Typography>Example</Typography>
          <Typography color="text.disabled">{wordToDisplay.example}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}></Box>
        <Typography variant="body2" color="text.disabled">
          ps. click to see translation
        </Typography>
      </CardContent>
      <Divider variant="middle" />

      <CardActions sx={sxStyles.btns}>
        <Button sx={{ width: '50%' }} variant="outlined" size="large" onClick={() => previous()}>
          Previous
        </Button>
        <Button sx={{ width: '50%' }} variant="contained" size="large" onClick={() => next()}>
          Next
        </Button>
      </CardActions>
    </Card>
  );
}

const sxStyles = createSxStylesList({
  word: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  definition: (theme) => ({
    textAlign: 'left',
    mt: 1,
    [theme.breakpoints.up('sm')]: {
      m: 1,
    },
    [theme.breakpoints.up('md')]: {
      m: 2,
    },
  }),
  example: (theme) => ({
    textAlign: 'left',
    mb: 2,
    [theme.breakpoints.up('sm')]: {
      margin: 1,
    },
    [theme.breakpoints.up('md')]: {
      margin: 2,
    },
  }),

  card: (theme) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  }),
  cardContent: {
    display: 'flex',
    flexDirection: 'column',

    flex: '1',
  },
  btns: {
    position: 'sticky',
    top: '100%',
    padding: '16px',
  },
});
