// TODO: Hardcoded mock data shown in production UI on the landing page. Replace with a real API fetch (`useGetVocabularyForLesson`).
import { VocabularyEntry } from '@/features/vocabulary/types/vocabularyEntry.type';

export const VOCABULARY_ENTRIES: VocabularyEntry[] = [
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
