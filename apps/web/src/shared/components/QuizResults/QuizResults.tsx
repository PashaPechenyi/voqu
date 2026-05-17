// TODO: Move to `features/quiz/components/QuizResults/` — this is quiz-specific, not generic shared UI.
// TODO: Hardcoded `3` in `{rightAnswersAmount}/3`. The total should come from the parent (`quizEntriesList.length`) via a `totalQuestions` prop.
// TODO: `onClick={() => handleTryAgainAction()}` — wrapping a no-arg handler in a new arrow function on every render. Pass the function directly: `onClick={handleTryAgainAction}`.
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
  rightAnswersAmount: number;
  handleTryAgainAction: () => void;
};

function QuizResults({
  rightAnswersAmount,
  handleTryAgainAction,
}: QuizResultsProps) {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader title={<Typography variant="h5">You did this!</Typography>} />
      <Divider variant="middle" />
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">{rightAnswersAmount}/3</Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions sx={sxStyles.finishActionsBox}>
        <Button
          variant="contained"
          size="large"
          sx={sxStyles.btnNext}
          onClick={() => handleTryAgainAction()}
        >
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
