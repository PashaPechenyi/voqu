import { FC } from 'react';
import { Button, Typography, CardContent, Card, CardHeader } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StepCounter from '@/shared/components/StepCounter/StepCounter';
import { AnswerVariant, Question } from '@/features/quiz/types/question.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const CLASSNAME = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
} as const;

type QuizCardProps = {
  question: Question;
  activeQuestionNumber: number;
  questionsAmount: number;
  selectedAnswerId: AnswerVariant['id'] | null;
  onSelectAnswer: (id: AnswerVariant['id']) => void;
  onNext: () => void;
};

const QuizCard: FC<QuizCardProps> = ({
  question,
  activeQuestionNumber,
  questionsAmount,
  selectedAnswerId,
  onSelectAnswer,
  onNext,
}) => {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader
        sx={sxStyles.cardHeader}
        avatar={<StarBorderIcon fontSize="large" sx={sxStyles.avatarIcon} />}
        title={<Typography variant="h4">Practice Quiz</Typography>}
        action={<StepCounter activeIndex={activeQuestionNumber} total={questionsAmount} />}
      />
      <CardContent sx={sxStyles.cardContent}>
        <Typography variant="h6" sx={sxStyles.question}>
          {question.question}
        </Typography>
        {question.variants.map((variant) => {
          const isCorrect = selectedAnswerId && variant.id === question.answerId;
          const isIncorrect =
            selectedAnswerId &&
            variant.id !== question.answerId &&
            variant.id === selectedAnswerId;

          return (
            <Button
              key={variant.id}
              disabled={!!selectedAnswerId}
              className={isCorrect ? CLASSNAME.CORRECT : isIncorrect ? CLASSNAME.INCORRECT : ''}
              sx={sxStyles.options}
              onClick={() => onSelectAnswer(variant.id)}
            >
              <Typography sx={sxStyles.variantText} variant="body1">
                {variant.text}
              </Typography>
            </Button>
          );
        })}
        {selectedAnswerId && (
          <Button sx={sxStyles.nextButton} onClick={onNext} variant="contained" color="tertiary">
            <Typography sx={sxStyles.variantText} variant="body1">
              Next
            </Typography>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  cardHeader: { display: 'flex', alignItems: 'center' },
  avatarIcon: (theme) => ({ fill: theme.palette.primary.main }),
  question: { px: '28px', mt: '10px', mb: '20px' },
  variantText: { textAlign: 'start' },
  nextButton: (theme) => ({
    width: 1,
    color: theme.palette.common.white,
    borderRadius: '10px',
    py: '10px',
    mt: '30px',
  }),
  options: (theme) => ({
    width: '100%',
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    py: '20px',
    ':hover': { border: `3px solid ${theme.palette.grey[800]}` },
    [`&.${CLASSNAME.CORRECT}`]: {
      border: `3px solid ${theme.palette.success.main}`,
      backgroundColor: theme.palette.success.light,
    },
    [`&.${CLASSNAME.INCORRECT}`]: {
      border: `3px solid ${theme.palette.error.main}`,
      backgroundColor: theme.palette.error.light,
    },
  }),
  card: (theme) => ({
    width: { xs: 1, md: '50%' },
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    py: '20px',
    px: '20px',
  }),
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    mt: '30px',
  },
});

export default QuizCard;
