import { createSxStylesList } from '@/theme/helpers';
import { Box, Button, Card, CardHeader, Typography } from '@mui/material';
import React from 'react';
import TestProgressAnimation from './TestProgressAnimation';
type QuizResultType = {
  correctAnswersAmount: number;
  restart: () => void;
  questionsAmount: number;
};
function QuizResult({ correctAnswersAmount, restart, questionsAmount }: QuizResultType) {
  const resultInPercents = (correctAnswersAmount / questionsAmount) * 100;
  return (
    <Card sx={styles.card}>
      <TestProgressAnimation percentage={resultInPercents} sx={{width:"65%"}}  />
      {/* <Box
        sx={{
          width: '350px',
          height: '350px',
          borderRadius: '100%',
          backgroundColor: 'lightgrey',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '350px',
            height: '350px',
            background: '#f5c16c',
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: `polygon(
    50% 0%,
    calc(50% + 90% / 2) 100%,
    calc(50% - 90% / 2) 100%
  )`,

            borderRadius: '0 0 80px 80px',
          }}
        ></Box>
        <Box
          sx={{
            width: '310px',
            height: '310px',
            borderRadius: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        >
          <Typography variant="h4">
            your score: {correctAnswersAmount}/ {questionsAmount}
          </Typography>
        </Box>
      </Box> */}

      <Button
        sx={{ width: '90%', color: 'white', borderRadius: '10px', py: '10px', mt: '30px' }}
        onClick={() => {
          restart();
        }}
        variant="contained"
        color="tertiary"
      >
        <Typography sx={{ textAlign: 'start' }} variant="body1">
          Try again
        </Typography>
      </Button>
    </Card>
  );
}
const styles = createSxStylesList({
  card: {
    width: { xs: 1, md: '50%' },
    border: '3px, solid grey',
    borderRadius: '10px',
    py: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default QuizResult;
