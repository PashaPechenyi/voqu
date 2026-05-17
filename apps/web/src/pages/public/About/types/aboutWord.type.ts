import { CefrLevel } from '@/features/levels/types/cefrLevel.type';

export type AboutWordCategory = 'verbs' | 'nouns' | 'adjectives' | 'phrases';

export type AboutWord = {
  id: string;
  word: string;
  translation: string;
  level: CefrLevel;
  category: AboutWordCategory;
  learned: boolean;
  addedAt: string;
};
