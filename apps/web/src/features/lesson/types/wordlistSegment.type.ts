import { LocalizedValue } from './lessonDetails.type';
import { Word } from './wordListItem.type';

export type WordlistSegment = {
  id: string;
  order: number;
  segmentType: 'vocabulary';
  segmentKind: 'wordlist';
  title: LocalizedValue;
  description: LocalizedValue;
  wordlist: {
    id: string;
    title: LocalizedValue;
    description: LocalizedValue;
    entries: Word[];
  };
};
