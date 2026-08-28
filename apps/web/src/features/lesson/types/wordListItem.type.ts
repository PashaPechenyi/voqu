import { LocalizedValue } from './lessonDetails.type';
import { WordExample } from './wordExample.type';

export type Word = {
  id?: string;
  order?: number;
  lemma: string;
  entryType: EntryType;
  partOfSpeech: PartsOfSpeechOptions;
  v2: null | string;
  v3: null | string;
  transcription: string;
  audioUrl: string;
  definition: LocalizedValue;
  note: LocalizedValue;
  examples: WordExample[];
  collocations?: [];
};
export enum PartsOfSpeechOptions {
  Noun = 'noun',
  Pronoun = 'pronoun',
  Verb = 'verb',
  Adjective = 'adjective',
  Adverb = 'adverb',
  Preposition = 'preposition',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
}
export enum EntryType {
  Word = 'word',
  Phrase = 'phrase',
}
