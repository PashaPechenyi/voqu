import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import SliderIndicator from '@/shared/components/SliderIndicator/SliderIndicator';
import { Word } from '@/features/vocabulary/types/word.types';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Pagination from '@/shared/components/Pagination/Pagination';
const words: Word[] = [
  {
    word: 'Serendipity',
    transcription: '/ˌserənˈdɪpəti/',
    partOfSpeech: 'noun',
    audio: 'audio',
    definition: 'The occurrence of events by chance in a happy or beneficial way',
    example: '"A fortunate stroke of serendipity brought us together."',
    synonyms: ['chance', 'fortune', 'luck'],
  },
  {
    word: 'Eloquent',
    transcription: '/ˈeləkwənt/',
    partOfSpeech: 'adjective',
    audio: 'audio',
    definition: 'Fluent or persuasive in speaking or writing',
    example: '"She gave an eloquent speech at the ceremony."',
    synonyms: ['articulate', 'fluent', 'persuasive'],
  },
];
let wordsAmount = words.length;

function VocabularyCard() {
  const [activeWordNumber, setActiveWordNumber] = useState<number>(0);

  function handlePrevWord() {
    if (activeWordNumber > 0) {
      setActiveWordNumber((prev) => prev - 1);
    }
  }
  function handleNextWord() {
    if (activeWordNumber < words.length - 1) {
      setActiveWordNumber((prev) => prev + 1);
    }
  }
  const activeWordData = words[activeWordNumber];
  return (
    <Card
      sx={{
        width: { xs: 1, md: '50%' },
        border: '3px, solid grey',
        borderRadius: '10px',
        py: '20px',
      }}
    >
      <CardContent sx={{ display: 'flex', width: 1, justifyContent: 'space-between' }}>
        <Pagination activeWordNumber={activeWordNumber} wordsAmount={wordsAmount} />
        <SliderIndicator words={words} />
      </CardContent>

      <CardContent sx={{ px: '20px', mt: '20px' }}>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography variant="h4">{activeWordData.word}</Typography>
          <VolumeUpIcon fontSize="large" sx={{ fill: '#71677D', ':hover': { fill: '#37123c' } }} />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', mt: '13px' }}>
          <Typography variant="body1">{activeWordData.transcription}</Typography>
          <Box sx={{ px: '13px', border: '1px solid grey', borderRadius: '7px', fontSize: '14px' }}>
            {activeWordData.partOfSpeech}
          </Box>
        </Box>
        <Box sx={{ height: '3.5px', backgroundColor: 'grey', width: 1, my: '40px' }} />
        <Box>
          <Typography color="secondary" variant="body3">
            Description
          </Typography>
          <Typography variant="body1" sx={{ color: '#71677D' }}>
            {activeWordData.definition}
          </Typography>
        </Box>

        <Box sx={{ mt: '25px' }}>
          <Typography variant="body3" color="secondary">
            Example
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ width: '5px', height: '27px', backgroundColor: 'grey' }}></Box>
            <Typography color="primary" variant="body1">
              {activeWordData.example}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: '25px' }}>
          <Typography variant="body3">Synonyms</Typography>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', mt: '10px' }}>
            {activeWordData.synonyms.map((synonym) => {
              return (
                <Box
                  sx={{
                    px: '13px',
                    py: '5px',
                    border: '1px solid grey',
                    borderRadius: '7px',
                    fontSize: '14px',
                  }}
                >
                  {synonym}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ height: '3.5px', backgroundColor: 'grey', width: 1, my: '30px' }} />
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          px: '20px',
          width: 1,
          gap: '10px',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePrevWord}
          sx={{
            width: { xs: 1, md: '50%' },
            height: '50px',
            border: '2px solid #71677D',
            '&:hover': { backgroundColor: '#71677D', color: 'white' },
          }}
        >
          Previous
        </Button>
        <Button
          color="tertiary"
          variant="contained"
          sx={{
            width: { xs: 1, md: '50%' },
            height: '50px',
            color: 'white',
            '&:hover': { backgroundColor: '#71677D' },
          }}
          onClick={handleNextWord}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
}

export default VocabularyCard;
