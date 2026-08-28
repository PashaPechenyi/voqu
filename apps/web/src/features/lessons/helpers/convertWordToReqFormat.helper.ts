import { Word, WordDTO } from '../types/word.type';

export const convertWordToReqFormat = (word: Word): WordDTO => {
  return {
    entryType: word.entryType!,

    examples: word.examples.map((el, index) => ({
      order: index,

      text: el.text,
    })),
    lemma: word.definition,
    partOfSpeech: word.partOfSpeech,
    transcription: word.transcription,
    v2: word.v2,
    v3: word.v3,
  };
};
