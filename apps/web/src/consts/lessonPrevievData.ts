import { PreviewLessonCard, Test } from './../models/models';

export const PREVIEW_LESSON_CARDS: PreviewLessonCard[] = [
  {
    id: 1,
    word: 'Hello',
    description: 'A greeting used when meeting someone or starting a conversation.',
    example: 'Hello! How are you today?',
    tr_word: 'Привіт',
    tr_description: 'Вітання, яке використовують під час зустрічі або на початку розмови.',
    tr_example: 'Привіт! Як ти сьогодні?',
  },
  {
    id: 2,
    word: 'Goodbye',
    description: 'A phrase used to say farewell when leaving someone.',
    example: 'Goodbye! See you tomorrow.',
    tr_word: 'До побачення',
    tr_description: 'Фраза, яку використовують під час прощання.',
    tr_example: 'Бувай! Побачимось завтра.',
  },
  {
    id: 3,
    word: 'Thank you',
    description: 'An expression used to show appreciation or gratitude.',
    example: 'Thank you for your help!',
    tr_word: 'Дякую',
    tr_description: 'Слово, яким виражають вдячність.',
    tr_example: 'Дякую за твою допомогу.',
  },
];

export const TEST: Test[] = [
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
