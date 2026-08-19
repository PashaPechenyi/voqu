import { LessonStatus } from '../enums/lessonStatus.enum';
import { Word } from './word.type';

export type Segment = {
  id: string;
  lessonId: string;
  segmentKindId?: string;
  segmentContentRowId?: string;
  title: Translation;
  description: Translation;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  wordlist: Wordlist;
};
export type Wordlist = {
  description: { value: string; translation: string | null };
  entries: Word[];
  id: string;
  title: { value: string; translation: string | null };
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
