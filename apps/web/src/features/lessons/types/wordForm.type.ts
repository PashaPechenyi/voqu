import { WordType } from '../enums/lessonWordType.enum';
import { Translation } from './lessonDetails.type';

export type WordFormValues = {
  word: string;
  transcription: string;
  partOfSpeech: WordType | null;
  translation: string;
  type: 'phrase' | 'word' | null;
  secondTense: string;
  thirdTense: string;
  examples: { id: string; order: number | null; text: Translation }[];
};
