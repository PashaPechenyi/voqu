// TODO: Typo `isTranlate` → `isTranslate`. Affects state, setter, and `getCurrentDataByLanuage` (also misspelled, should be `getCurrentDataByLanguage`).
// TODO: Boolean naming `isTranslate` is also ambiguous — it sounds like "is currently translating". Use a clearer name like `showOriginal` / `isShowingTranslation`, or a `language: 'en' | 'uk'` state.
// TODO: `previous()` does `prev === 0 ? 0 : prev - 1` — but `next()` wraps around (`prev === cards.length - 1 ? 0 : prev + 1`). Inconsistent UX. Pick one (wrap both or stop at boundaries on both).
// TODO: When a slide changes, `setIsTranlate(false)` resets to translation, but on first mount `isTranlate` is `true`. So the very first slide shows the original word and every subsequent slide shows the translation first. Probably a bug — initial state should align with the rest of the flow.
// TODO: Clicking the card toggles translation (`onClick={() => setIsTranlate(...)}`), but clicking the audio `<IconButton>` inside the card also toggles because the click bubbles. Stop propagation on the icon button or move the toggle to a button.
// TODO: Audio button does nothing — no `audio` field is on `VocabularyEntry`. Wire to a real audio source or remove the button.
// TODO: "ps. click to see translation" caption is mixed-language and very informal; replace with a proper localized hint.
// TODO: Inline `style={{ width: '50%' }}` on each button — extract to sxStyles.
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
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isTranlate, setIsTranlate] = useState(true);
  const card = cards[activeWordIndex];
  const next = () => {
    setIsTranlate(false);
    setActiveWordIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };
  const previous = () => {
    setIsTranlate(false);
    setActiveWordIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const getCurrentDataByLanuage = (card: VocabularyEntry) => {
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

export default VocabularyCardsSlider;
