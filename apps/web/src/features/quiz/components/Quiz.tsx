import { FC, useState } from 'react';
import QuizCard from './QuizCard';
import QuizResult from './QuizResult';
import { MOCK_QUESTIONS } from '../constants/mockQuestions.const';
import { AnswerVariant } from '../types/question.type';

const Quiz: FC = () => {
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<AnswerVariant['id'] | null>(null);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState<number>(0);

  const activeQuestion = MOCK_QUESTIONS[activeQuestionNumber];
  const questionsAmount = MOCK_QUESTIONS.length;

  const handleRestart = () => {
    setActiveQuestionNumber(0);
    setCorrectAnswersAmount(0);
    setSelectedAnswerId(null);
  };

  const handleNextQuestion = () => {
    if (activeQuestionNumber < questionsAmount) {
      setActiveQuestionNumber((prev) => prev + 1);
    }
    setSelectedAnswerId(null);
  };

  const handleSelectAnswer = (answerId: AnswerVariant['id']) => {
    if (activeQuestion && answerId === activeQuestion.answerId) {
      setCorrectAnswersAmount((prev) => prev + 1);
    }
    setSelectedAnswerId(answerId);
  };

  if (activeQuestionNumber >= questionsAmount) {
    return (
      <QuizResult
        correctAnswersAmount={correctAnswersAmount}
        questionsAmount={questionsAmount}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <QuizCard
      question={activeQuestion}
      selectedAnswerId={selectedAnswerId}
      onSelectAnswer={handleSelectAnswer}
      activeQuestionNumber={activeQuestionNumber}
      questionsAmount={questionsAmount}
      onNext={handleNextQuestion}
    />
  );
};

export default Quiz;
