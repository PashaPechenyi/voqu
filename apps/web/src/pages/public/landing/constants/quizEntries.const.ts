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
