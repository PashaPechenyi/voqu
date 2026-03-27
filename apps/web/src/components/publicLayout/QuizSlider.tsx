import { Question } from '@/models/types';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuizCard from './QuizCard';
import QuizResult from './QuizResult';

const questions: Question[] = [
  {
    question: 'What does the word "ode" mean?',
    variants: [
      'A type of ancient poetry',
      'A modern music genre',
      'A scientific experiment',
      'A historical event',
    ],
    answer: 'A type of ancient poetry',
  },
  {
    question: 'What does the verb "decline" mean?',
    variants: [
      'To refuse or reject something',
      'To accept gladly',
      'To carefully examine',
      'To delay an action',
    ],
    answer: 'To refuse or reject something',
  },
  {
    question: 'Who is an "astronomer"?',
    variants: [
      'A person who studies stars',
      'A type of musical instrument',
      'A famous painting',
      'A natural disaster',
    ],
    answer: 'A person who studies stars',
  },
  {
    question: 'What does "elated" mean?',
    variants: ['Extremely happy or joyful', 'Very tired', 'Slightly angry', 'Completely confused'],
    answer: 'Extremely happy or joyful',
  },
  {
    question: 'What is an "excursion"?',
    variants: [
      'A short journey made for pleasure',
      'A dangerous adventure',
      'A long business trip',
      'A daily routine activity',
    ],
    answer: 'A short journey made for pleasure',
  },
  {
    question: 'What does the word "??" mean?',
    variants: ['A type of ancient poetry', 'A modern music genre', '??', 'A historical event'],
    answer: '??',
  },
];
function QuizSlider() {
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(0);
  const [usersAnswer, setUsersAnswer] = useState<string | null>(null);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState<number>(0);
  const activeQuestionData = questions[activeQuestionNumber];
  const questionsAmount = questions.length;

  function restart() {
    setActiveQuestionNumber(0);
    setCorrectAnswersAmount(0);
  }

  function handleNextQuestion() {
    if (activeQuestionNumber <= questions.length - 1) {
      setActiveQuestionNumber((prev) => prev + 1);
    }
    setUsersAnswer(null);
  }

  function handleAnswerClick( selectedAnswer: string) {
    if (activeQuestionData.answer == selectedAnswer) {
      setCorrectAnswersAmount((prev) => prev + 1);
      console.log(correctAnswersAmount, 'result');
    }
    setUsersAnswer(selectedAnswer)
  }

  return (
    <>
      {activeQuestionNumber < questionsAmount ? (
        <QuizCard
          activeQuestionData={activeQuestionData}
          usersAnswer={usersAnswer}
          handleAnswerClick={handleAnswerClick}
          activeQuestionNumber={activeQuestionNumber}
          questionsAmount={questionsAmount}
          handleNextQuestion={handleNextQuestion}
        />
      ) : (
        <QuizResult correctAnswersAmount={correctAnswersAmount} questionsAmount={questionsAmount} restart={restart} />
      )}
    </>
  );
}

export default QuizSlider;
