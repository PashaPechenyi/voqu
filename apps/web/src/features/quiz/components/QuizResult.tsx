import { FC } from 'react';
import { Button, Card, Typography } from '@mui/material';
import ProgressCircleIcon from '@/shared/components/ProgressCircleIcon/ProgressCircleIcon';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type QuizResultProps = {
  correctAnswersAmount: number;
  questionsAmount: number;
  onRestart: () => void;
};

const QuizResult: FC<QuizResultProps> = ({ correctAnswersAmount, questionsAmount, onRestart }) => {
  const resultInPercents =
    questionsAmount === 0 ? 0 : (correctAnswersAmount / questionsAmount) * 100;

  return (
    <Card sx={sxStyles.card}>
      <ProgressCircleIcon percentage={resultInPercents} sx={sxStyles.progressIcon} />
      <Button sx={sxStyles.retryButton} onClick={onRestart} variant="contained" color="tertiary">
        <Typography sx={sxStyles.retryLabel} variant="body1">
          Try again
        </Typography>
      </Button>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: (theme) => ({
    width: { xs: 1, md: '50%' },
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    py: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  }),
  progressIcon: { width: '65%' },
  retryButton: (theme) => ({
    width: '90%',
    color: theme.palette.common.white,
    borderRadius: '10px',
    py: '10px',
    mt: '30px',
  }),
  retryLabel: { textAlign: 'start' },
});

export default QuizResult;
