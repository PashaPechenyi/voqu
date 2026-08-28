import { WordFormValues } from '../types/wordForm.type';

export const convertFormWord = (formWord: WordFormValues) => {
  return {
    entryType: formWord.type!,
    definition: { value: formWord.word, translation: formWord.translation },
    examples: formWord.examples,
    lemma: formWord.word,
    partOfSpeech: formWord.partOfSpeech!,
    transcription: formWord.transcription,
    v2: formWord.secondTense,
    v3: formWord.thirdTense,
  };
};
