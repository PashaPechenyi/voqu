import { Button, Typography, CardContent, Card, CardHeader } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import Pagination from './Pagination';
import clsx from 'clsx';
import { Question } from '@/models/types';

type QuizCardType = {
  activeQuestionData: Question;
  handleAnswerClick: (selectedAnswer: string) => void;
  activeQuestionNumber: number;
  questionsAmount: number;
  handleNextQuestion: () => void;
  usersAnswer: string | null;
};
function QuizCard({
  activeQuestionData,
  handleAnswerClick,
  activeQuestionNumber,
  questionsAmount,
  handleNextQuestion,
  usersAnswer,
}: QuizCardType) {
  return (
    <Card sx={styles.card}>
      <CardHeader
      sx={{display:"flex", alignItems:"center"}}
        avatar={<StarBorderIcon fontSize="large" sx={{ fill: '#71677D' }} />}
        title={<Typography variant="h4">Practice Quiz</Typography> }
        action={
          <Pagination activeWordNumber={activeQuestionNumber} wordsAmount={questionsAmount} />
        }
        
      />

      <CardContent sx={styles.cardContent}>
        <Typography variant="h6" sx={{ px: '28px', mt: '10px' , mb:"20px"}}>
          {activeQuestionData.question}
        </Typography>
        {activeQuestionData.variants.map((variant, ind) => {
          return (
            <Button
              key={ind}
              className={clsx({
                correct: usersAnswer && variant == activeQuestionData.answer,
                incorrect:
                  usersAnswer && variant !== activeQuestionData.answer && variant == usersAnswer,
              })}
              sx={styles.options}
              onClick={() => {
                if (usersAnswer) return;
                handleAnswerClick(variant);
              }}
            >
              <Typography sx={{ textAlign: 'start' }} variant="body1">
                {variant}
              </Typography>
            </Button>
          );
        })}

        {usersAnswer && (
          <Button
            sx={{ width: 1, color: 'white', borderRadius: '10px', py: '10px', mt: '30px' }}
            onClick={() => {
              handleNextQuestion();
            }}
            variant="contained"
            color="tertiary"
          >
            <Typography sx={{ textAlign: 'start' }} variant="body1">
              Next
            </Typography>
          </Button>
        )}
      </CardContent>
    </Card>
    //
  );
}
const styles = {
  options: {
    width: '100%',
    border: '3px solid grey',
    borderRadius: '10px',
    py: '20px',
    ':hover': { border: '3px solid #38353b' },
    '&.correct': { border: '3px solid green', backgroundColor: '#00a90667' },
    '&.incorrect': { border: '3px solid red', backgroundColor: '#de290082' },
  },
  card: {
    width: { xs: 1, md: '50%' },
    border: '3px, solid grey',
    borderRadius: '10px',
    py: '20px',
    px: '20px',
   
},
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    mt: '30px',
  },
};

export default QuizCard;
