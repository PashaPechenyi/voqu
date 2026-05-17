import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { VocabularyEntry } from '@/features/vocabulary/types/vocabularyEntry.type';

type VocabularyCardsSliderProps = {
  cards: VocabularyEntry[];
};

function VocabularyCardsSlider({ cards }: VocabularyCardsSliderProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isOriginal, setIsOriginal] = useState(true);
  const activeCard = cards[activeCardIndex];

  const goToNext = () => {
    setIsOriginal(true);
    setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setIsOriginal(true);
    setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const getCardContentByLanguage = (entry: VocabularyEntry) => ({
    word: isOriginal ? entry.word : entry.tr_word,
    definition: isOriginal ? entry.description : entry.tr_description,
    example: isOriginal ? entry.example : entry.tr_example,
  });

  const cardContent = getCardContentByLanguage(activeCard);

  return (
    <Card sx={sxStyles.card} onClick={() => setIsOriginal((prev) => !prev)}>
      <CardHeader
        sx={sxStyles.word}
        action={
          <IconButton onClick={(e) => e.stopPropagation()}>
            <VolumeUpRoundedIcon fontSize="large" />
          </IconButton>
        }
        title={<Typography variant="h4">{cardContent.word}</Typography>}
      />
      <Divider variant="middle" />
      <CardContent sx={sxStyles.cardContent}>
        <Box sx={sxStyles.definition}>
          <Typography>Definition</Typography>
          <Typography color="text.disabled">{cardContent.definition}</Typography>
        </Box>

        <Box sx={sxStyles.example}>
          <Typography>Example</Typography>
          <Typography color="text.disabled">{cardContent.example}</Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" color="text.disabled">
          ps. click to see translation
        </Typography>
      </CardContent>
      <Divider variant="middle" />

      <CardActions sx={sxStyles.btns}>
        <Button sx={sxStyles.actionBtn} variant="outlined" size="large" onClick={goToPrevious}>
          Previous
        </Button>
        <Button sx={sxStyles.actionBtn} variant="contained" size="large" onClick={goToNext}>
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
    flex: 1,
  },
  btns: {
    position: 'sticky',
    top: '100%',
    padding: '16px',
  },
  actionBtn: {
    width: '50%',
  },
});

export default VocabularyCardsSlider;
