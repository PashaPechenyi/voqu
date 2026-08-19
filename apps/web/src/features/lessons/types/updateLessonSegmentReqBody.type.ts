import { Word, WordDTO } from './word.type';

export type UpdateLessonSegmentReqBody = {
  order: number;

  title: string;
  description: string;
  content: {
    description: {
      value: string;
      translation: string | null;
    };
    entries: WordDTO[];
    title: {
      value: string;
      translation: string | null;
    };
  };
};
