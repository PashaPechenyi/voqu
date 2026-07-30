import { LessonStatus } from '../enums/lessonStatus.enum';
import { Word } from './word.type';

export type Segment = {
  id: string;
  lessonId: string;
  segmentKindId: string;
  segmentContentRowId: string;
  title: Translation;
  description: Translation;
  order: number;
  createdAt: string;
  updatedAt: string;
  wordsList: Wordlist[] | [];
};
export type Wordlist = {
  description: { value: 'Core words and phrases for making plans'; translation: null };
  entries: Word[] | [];
  id: '441f049c-cd8d-4d2a-8d21-db06f189e798';
  title: { value: 'Plans & invitations'; translation: null };
};

export type LessonDetailsStructure = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  segments: Segment[];
};

export type LessonDetails = {
  id: string;
  CourseId: string;
  sourceLanguage: string;
  translationLanguage: string;
  title: Translation;
  subtitle: Translation;
  description: Translation;
  order: number;
  status: LessonStatus;
  duration: number | null;
  segments: Segment[];
};
export type Translation = {
  value: string;
  translation: string | null;
};
