import { useState } from 'react';
import { QuizEntry } from '@/shared/types/quizEntry.type';
import QuizResults from '../QuizResults/QuizResults';
import QuizCard from '../QuizCard/QuizCard';

type QuizSliderProps = {
  quizEntries: QuizEntry[];
};

function QuizSlider({ quizEntries }: QuizSliderProps) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const activeQuizEntry = quizEntries[activeQuestionIndex];
  const isQuizCompleted = activeQuestionIndex >= quizEntries.length;

  const handleTryAgain = () => {
    setActiveQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setCorrectAnswersCount(0);
  };

  const handleNext = () => {
    setActiveQuestionIndex((prev) => prev + 1);
    setSelectedAnswerIndex(null);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswerIndex(answerIndex);
    if (answerIndex === activeQuizEntry.rightOption) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  if (isQuizCompleted) {
    return (
      <QuizResults
        correctAnswersCount={correctAnswersCount}
        totalQuestions={quizEntries.length}
        onTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <QuizCard
      activeQuizEntry={activeQuizEntry}
      selectedAnswerIndex={selectedAnswerIndex}
      onNext={handleNext}
      onSelectAnswer={handleSelectAnswer}
    />
  );
}

export default QuizSlider;
