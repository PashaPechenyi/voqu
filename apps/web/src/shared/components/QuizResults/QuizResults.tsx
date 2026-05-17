import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

type QuizResultsProps = {
  correctAnswersCount: number;
  totalQuestions: number;
  onTryAgain: () => void;
};

function QuizResults({ correctAnswersCount, totalQuestions, onTryAgain }: QuizResultsProps) {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader title={<Typography variant="h5">You did this!</Typography>} />
      <Divider variant="middle" />
      <CardContent sx={sxStyles.content}>
        <Typography variant="h4">
          {correctAnswersCount}/{totalQuestions}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions sx={sxStyles.finishActionsBox}>
        <Button variant="contained" size="large" sx={sxStyles.btnNext} onClick={onTryAgain}>
          Try again?
        </Button>
      </CardActions>
    </Card>
  );
}

const sxStyles = createSxStylesList({
  card: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  }),
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNext: {
    width: '100%',
  },
  finishActionsBox: {
    position: 'sticky',
    top: '100%',
    p: 2,
  },
});

export default QuizResults;
