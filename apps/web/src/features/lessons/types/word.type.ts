import { WordType } from '../enums/lessonWordType.enum';
import { Translation } from './lessonDetails.type';

// export type Word = {
//   id: string;
//   word: string;
//   transcription: string;
//   partOfSpeech: WordType;
//   translation: string;
//   type: 'phrase' | 'word';
//   secondTense: string;
//   thirdTense: string;
//   examples: {
//     value: string;
//     translation: string;
//   }[];
// };
export type Word = {
  audioUrl: string;
  collocations: any;
  definition: Translation;
  entryType: 'phrase' | 'word';
  examples: { id: string; order: number; text: Translation }[];
  id: string;
  lemma: string;
  note: Translation;
  order: number | null;
  partOfSpeech: WordType;
  transcription: string;
  v2: string | null;
  v3: string | null;
};
