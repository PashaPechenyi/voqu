import { WordType } from '../enums/lessonWordType.enum';

export type WordFormValues = {
  word: string;
  transcription: string;
  partOfSpeech: WordType | null;
  translation: string;
  type: 'phrase' | 'word' | null;
  secondTense: string;
  thirdTense: string;
  examples: {
    value: string;
    translation: string;
  }[];
};
