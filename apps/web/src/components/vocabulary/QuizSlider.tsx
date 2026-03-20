import { useState } from 'react';
import QuizResults from './QuizResults';
import { Test } from '@/models/models';
import QuizCard from './QuizCard';

type QuizProps = {
  testData: Test[];
};
export default function QuizSlider({ testData }: QuizProps) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);
  const activeQuestionData = testData[activeQuestionIndex];
  const isQuizCompleted = activeQuestionIndex >= testData.length;

  const handleTryAgainAction = () => {
    setActiveQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setRightAnswersAmount(0);
  };

  const nextAction = () => {
    setActiveQuestionIndex((prev) => prev + 1);
    setSelectedAnswerIndex(null);
  };
  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswerIndex(answerIndex);

    if (answerIndex === activeQuestionData.rightOption) {
      setRightAnswersAmount((prev) => prev + 1);
    }
  };
  return (
    <>
      {isQuizCompleted ? (
        <QuizResults
          rightAnswersAmount={rightAnswersAmount}
          handleTryAgainAction={handleTryAgainAction}
        />
      ) : (
        <QuizCard
          activeQuestionData={activeQuestionData}
          selectedAnswerIndex={selectedAnswerIndex}
          nextAction={nextAction}
          handleSelectAnswer={handleSelectAnswer}
        />
      )}
    </>
  );
}
