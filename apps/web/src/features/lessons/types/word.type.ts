import { WordType } from '../enums/lessonWordType.enum';

export type Word = {
  id: string;
  word: string;
  transcription: string;
  partOfSpeech: WordType;
  translation: string;
  type: 'phrase' | 'word';
  secondTense: string;
  thirdTense: string;
  examples: {
    value: string;
    translation: string;
  }[];
};
