import { FC, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SliderIndicator from './SliderIndicator';
import StepCounter from '@/shared/components/StepCounter/StepCounter';
import { MOCK_WORDS } from '../constants/mockWords.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const VocabularyCard: FC = () => {
  const [activeWordNumber, setActiveWordNumber] = useState<number>(0);
  const wordsAmount = MOCK_WORDS.length;
  const activeWord = MOCK_WORDS[activeWordNumber];

  const handlePrevWord = () => {
    if (activeWordNumber > 0) {
      setActiveWordNumber((prev) => prev - 1);
    }
  };

  const handleNextWord = () => {
    if (activeWordNumber < wordsAmount - 1) {
      setActiveWordNumber((prev) => prev + 1);
    }
  };

  return (
    <Card sx={sxStyles.card}>
      <CardContent sx={sxStyles.topRow}>
        <StepCounter activeIndex={activeWordNumber} total={wordsAmount} />
        <SliderIndicator total={wordsAmount} activeIndex={activeWordNumber} />
      </CardContent>

      <CardContent sx={sxStyles.bodyContent}>
        <Box sx={sxStyles.wordHeader}>
          <Typography variant="h4">{activeWord.word}</Typography>
          <VolumeUpIcon fontSize="large" sx={sxStyles.volumeIcon} />
        </Box>
        <Box sx={sxStyles.transcriptionRow}>
          <Typography variant="body1">{activeWord.transcription}</Typography>
          <Box sx={sxStyles.partOfSpeech}>{activeWord.partOfSpeech}</Box>
        </Box>
        <Box sx={sxStyles.divider} />
        <Box>
          <Typography color="secondary" variant="body3">
            Description
          </Typography>
          <Typography variant="body1" sx={sxStyles.definitionText}>
            {activeWord.definition}
          </Typography>
        </Box>

        <Box sx={sxStyles.section}>
          <Typography variant="body3" color="secondary">
            Example
          </Typography>
          <Box sx={sxStyles.exampleRow}>
            <Box sx={sxStyles.exampleBar} />
            <Typography color="primary" variant="body1">
              {activeWord.example}
            </Typography>
          </Box>
        </Box>
        <Box sx={sxStyles.section}>
          <Typography variant="body3">Synonyms</Typography>
          <Box sx={sxStyles.synonymsRow}>
            {activeWord.synonyms.map((synonym) => (
              <Box key={synonym} sx={sxStyles.synonymChip}>
                {synonym}
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={sxStyles.dividerBottom} />
      </CardContent>
      <CardActions sx={sxStyles.actions}>
        <Button variant="outlined" onClick={handlePrevWord} sx={sxStyles.prevButton}>
          Previous
        </Button>
        <Button
          color="tertiary"
          variant="contained"
          sx={sxStyles.nextButton}
          onClick={handleNextWord}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: (theme) => ({
    width: { xs: 1, md: '50%' },
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    py: '20px',
  }),
  topRow: { display: 'flex', width: 1, justifyContent: 'space-between' },
  bodyContent: { px: '20px', mt: '20px' },
  wordHeader: { display: 'flex', gap: '10px', alignItems: 'center' },
  volumeIcon: (theme) => ({
    fill: theme.palette.primary.main,
    ':hover': { fill: theme.palette.secondary.main },
  }),
  transcriptionRow: { display: 'flex', gap: '10px', mt: '13px' },
  partOfSpeech: (theme) => ({
    px: '13px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '7px',
    fontSize: '14px',
  }),
  divider: (theme) => ({
    height: '3.5px',
    backgroundColor: theme.palette.divider,
    width: 1,
    my: '40px',
  }),
  dividerBottom: (theme) => ({
    height: '3.5px',
    backgroundColor: theme.palette.divider,
    width: 1,
    my: '30px',
  }),
  definitionText: (theme) => ({ color: theme.palette.primary.main }),
  section: { mt: '25px' },
  exampleRow: { display: 'flex', gap: '20px' },
  exampleBar: (theme) => ({
    width: '5px',
    height: '27px',
    backgroundColor: theme.palette.divider,
  }),
  synonymsRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', mt: '10px' },
  synonymChip: (theme) => ({
    px: '13px',
    py: '5px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '7px',
    fontSize: '14px',
  }),
  actions: {
    display: 'flex',
    px: '20px',
    width: 1,
    gap: '10px',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  prevButton: (theme) => ({
    width: { xs: 1, md: '50%' },
    height: '50px',
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }),
  nextButton: (theme) => ({
    width: { xs: 1, md: '50%' },
    height: '50px',
    color: theme.palette.common.white,
    '&:hover': { backgroundColor: theme.palette.primary.main },
  }),
});

export default VocabularyCard;
