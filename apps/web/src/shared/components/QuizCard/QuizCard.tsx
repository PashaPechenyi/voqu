import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import clsx from 'clsx';
import { QuizEntry } from '@/shared/types/quizEntry.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type QuizSliderProps = {
  activeQuizEntry: QuizEntry;
  selectedAnswerIndex: number | null;
  handleSelectAnswer: (ansIndex: number) => void;
  nextAction: () => void;
};

function QuizCard({
  handleSelectAnswer,
  activeQuizEntry,
  selectedAnswerIndex,
  nextAction,
}: QuizSliderProps) {
  const isSelectedAnswerCorrect = selectedAnswerIndex === activeQuizEntry.rightOption;
  const isAnswerSelected = selectedAnswerIndex !== null;
  return (
    <>
      <Card sx={sxStyles.card}>
        <CardHeader
          avatar={<StarBorderRoundedIcon fontSize="large" color="primary" />}
          title={
            <Typography variant={'h4'} sx={{ textAlign: 'start' }}>
              Practice Quiz
            </Typography>
          }
        ></CardHeader>
        <Divider variant="middle" />
        <CardContent>
          <Typography>{activeQuizEntry.question}</Typography>
          <Box sx={sxStyles.answers as any} mb={2}>
            {activeQuizEntry.answers.map((answer, ansIndex) => (
              <Button
                key={ansIndex}
                size="large"
                disabled={isAnswerSelected}
                className={clsx({
                  correct: isAnswerSelected && ansIndex === activeQuizEntry.rightOption,
                  incorrect: selectedAnswerIndex === ansIndex && !isSelectedAnswerCorrect,
                })}
                sx={sxStyles.answerBtn}
                onClick={() => handleSelectAnswer(ansIndex)}
              >
                {answer}
              </Button>
            ))}
          </Box>
          {isAnswerSelected && (
            <Alert severity={isSelectedAnswerCorrect ? 'success' : 'error'}>
              {isSelectedAnswerCorrect ? 'Excelent!' : 'Not Quite right'}
            </Alert>
          )}
        </CardContent>
        <Divider variant="middle" />
        <CardActions sx={sxStyles.actionsBox}>
          <Button
            disabled={!isAnswerSelected}
            variant="contained"
            size="large"
            sx={sxStyles.btnNext}
            onClick={() => {
              nextAction();
            }}
          >
            Next
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

const sxStyles = createSxStylesList({
  answers: {
    mt: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  answerBtn: {
    textAlign: 'start',
    border: '1px solid',
    borderColor: 'primary.main',
    width: '100%',
    p: 2,
    alignContent: 'start',
    '&.correct': {
      backgroundColor: '#f0fdf4',
      border: '2px solid oklch(.723 .219 149.579)',
    },
    '&.incorrect': {
      backgroundColor: 'oklch(.971 .013 17.38)',
      border: '2px solid oklch(.637 .237 25.331)',
    },
  },
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
  actionsBox: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '16px',
  },
});

export default QuizCard;
