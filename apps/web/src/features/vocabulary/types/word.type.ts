export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';

export type Word = {
  id: string;
  word: string;
  transcription: string;
  partOfSpeech: PartOfSpeech;
  audioUrl: string;
  definition: string;
  example: string;
  synonyms: string[];
};
