import { Word } from './word.type';

export type Segment = {
  id: string;
  title: string;
  description: string;
  wordsList: Word[] | [];
};

export type LessonDetailsStructure = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  segments: Segment[];
};
