import { Translation, Wordlist } from './lessonDetails.type';
import { Word } from './word.type';

export type CreateLessonSegmentReqBody = {
  order: number;
  SegmentKindKey: string;
  title: string;
  description: string;
  content: {
    description: {
      value: string;
      translation: string | null;
    };
    entries: Word[];
    title: {
      value: string;
      translation: string | null;
    };
  };
};
