export type Word = {
  word: string;
  transcription: string;
  partOfSpeech: string;
  audio: string;
  definition: string;
  example: string;
  synonyms: string[];
};
export type Question = {
  question: string;
  variants: string[];
  answer: string;
};
export type Level={
    level:string,
    description:string,
    skills:string[]
}