import { createSxStylesList } from '@/theme/helpers';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { TEST } from '@/consts/lessonPrevievData';
import { useState } from 'react';
import clsx from 'clsx';

export default function QuizSlider() {
  const [state, setState] = useState<'on' | 'off' | 'finish'>('off');
  const [dataIndex, setDataIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [mark, setMark] = useState(0);
  const quizCard = TEST[dataIndex];
  // const selectedAnswerText = selectedAnswerIndex !== null ? quizCard.answers[selectedAnswerIndex] : null;
  const isSelectedAnswerCorrect = selectedAnswerIndex === quizCard.rightOption;

  const selectingAnswer = (answerIndex: number) => {
    setState('on');
    setSelectedAnswerIndex(answerIndex);

    if (answerIndex === quizCard.rightOption) {
      setMark((prev) => prev + 1);
    }
  };
  const nextAction = () => {
    if (dataIndex === TEST.length - 1) {
      setState('finish');
      return;
    }

    setDataIndex((prev) => prev + 1);
    setState('off');
    setSelectedAnswerIndex(null);
  };
  return (
    <>
      {state != 'finish' ? (
        <Card sx={sxStyles.card}>
          <CardHeader
            avatar={<StarBorderRoundedIcon fontSize="large" color="primary" />}
            title={
              <Typography variant={'h4'} sx={{ textAlign: 'start' }}>
                Practice Quiz
              </Typography>
            }
          ></CardHeader>

          <CardContent>
            <Box>
              <Typography>{quizCard.question}</Typography>
              <Box sx={sxStyles.answers as any}>
                {quizCard.answers.map((answer, ans_index) => (
                  <Button
                    key={ans_index}
                    size="large"
                    disabled={selectedAnswerIndex !== null}
                    className={clsx({
                      default: selectedAnswerIndex === null,
                      correct: selectedAnswerIndex === ans_index,
                      incorrect:
                        selectedAnswerIndex === ans_index && isSelectedAnswerCorrect === false,
                    })}
                    sx={sxStyles.answerBtn}
                    onClick={() => selectingAnswer(ans_index)}
                  >
                    {answer}
                  </Button>
                ))}
              </Box>
            </Box>
          </CardContent>
          {state === 'on' && (
            <CardActions sx={sxStyles.actionsBox}>
              <Typography
                className={clsx({
                  correct: isSelectedAnswerCorrect === true,
                  incorrect: isSelectedAnswerCorrect === false,
                })}
                sx={sxStyles.isRight}
              >
                {isSelectedAnswerCorrect ? 'Excelent!' : 'Not Quite right'}
              </Typography>
              <Button
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
          )}
        </Card>
      ) : (
        <Card sx={sxStyles.card}>
          <CardContent>
            <Typography variant="h5">You did this!</Typography>
            <Divider />
            <Typography mt={15} variant="h4">
              {mark}/3
            </Typography>
          </CardContent>
          <CardActions sx={sxStyles.finishActionsBox}>
            <Button
              variant="contained"
              size="large"
              sx={sxStyles.btnNext}
              onClick={() => {
                setDataIndex(0);
                setState('off');
                setSelectedAnswerIndex(null);
                setMark(0);
              }}
            >
              Try again?
            </Button>
          </CardActions>
        </Card>
      )}
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
    '&.default': {
      backgroundColor: 'transparent',
    },
  },
  card: (theme) => ({
    width: '100%',
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
  },
  isRight: {
    display: 'block',
    p: 2,
    borderRadius: 2,
    width: '50%',
    mb: 2,

    '&.correct': {
      backgroundColor: '#f0fdf4',
      border: '2px solid oklch(.723 .219 149.579)',
    },
    '&.incorrect': {
      color: 'oklch(.476 .114 61.907)',
      backgroundColor: 'oklch(.987 .026 102.212)',
      border: '2px solid oklch(.795 .184 86.047)',
    },
  },
  finishActionsBox: {
    position: 'sticky',
    top: '100%',
  },
});
