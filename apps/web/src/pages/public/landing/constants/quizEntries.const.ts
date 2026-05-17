// TODO: Constant lives in `pages/public/landing/constants/` which is fine for page-local data, BUT `QuizEntry` is imported from `shared/` even though it's a business entity. Once `quizEntry.type.ts` moves to `features/quiz/types/`, update this import.
// TODO: Mock data; for the public landing it might be acceptable, but document with a comment that this is intentional preview content (otherwise it looks like a missing API wire-up).
import { QuizEntry } from '@/shared/types/quizEntry.type';

export const QUIZ_ENTRIES_LIST: QuizEntry[] = [
  {
    question: 'What is the correct translation of the word "Hello"?',
    answers: ['Привіт', 'До побачення', 'Дякую'],
    rightOption: 0,
  },
  {
    question: 'What is the correct translation of the word "Goodbye"?',
    answers: ['Дякую', 'До побачення', 'Привіт'],
    rightOption: 1,
  },
  {
    question: 'What is the correct translation of the word "Thank you"?',
    answers: ['До побачення', 'Привіт', 'Дякую'],
    rightOption: 2,
  },
];
