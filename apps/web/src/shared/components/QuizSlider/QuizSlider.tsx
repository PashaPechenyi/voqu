// TODO: Move to `features/quiz/components/QuizSlider/` together with QuizCard / QuizResults / QuizEntry.
// TODO: Typo `isTranlate` should be `isTranslate` (also propagated to `VocabularyCardsSlider.tsx` — fix in both).
// TODO: `<>...</>` wrapping a single child is unnecessary — remove the fragment.
// TODO: `previous()`/`next()` are passed inline as `() => previous()` in `VocabularyCardsSlider` and similar code — pass the function reference directly to avoid creating new closures on each render.
import { useState } from 'react';
import { QuizEntry } from '@/shared/types/quizEntry.type';
import QuizResults from '../QuizResults/QuizResults';
import QuizCard from '../QuizCard/QuizCard';

type QuizProps = {
  quizEntriesList: QuizEntry[];
};
function QuizSlider({ quizEntriesList }: QuizProps) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);
  const activeQuizEntry = quizEntriesList[activeQuestionIndex];
  const isQuizCompleted = activeQuestionIndex >= quizEntriesList.length;

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

    if (answerIndex === activeQuizEntry.rightOption) {
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
          activeQuizEntry={activeQuizEntry}
          selectedAnswerIndex={selectedAnswerIndex}
          nextAction={nextAction}
          handleSelectAnswer={handleSelectAnswer}
        />
      )}
    </>
  );
}

export default QuizSlider;
