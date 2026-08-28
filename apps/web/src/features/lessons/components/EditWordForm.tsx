import { Word } from '../types/word.type';
import { WordFormValues } from '../types/wordForm.type';
import { FC } from 'react';
import { Segment, Wordlist } from '../types/lessonDetails.type';

import WordForm from './WordForm';

type EditWordFormProps = {
  word: Word;
  onUpdate: (body: Partial<Segment>) => void;
  wordlist: Wordlist;
};

const getDefaultValues = (word: Word): WordFormValues => ({
  word: word.definition.value,
  translation: word.definition.translation!,
  transcription: word.transcription,
  type: word.entryType,
  partOfSpeech: word.partOfSpeech,
  secondTense: word?.v2 ?? '',
  thirdTense: word?.v3 ?? '',
  examples: word.examples,
});

const EditWordForm: FC<EditWordFormProps> = ({ word, onUpdate, wordlist }: EditWordFormProps) => {
  return (
    <WordForm
      word={word}
      wordlist={wordlist}
      defaultValues={getDefaultValues(word)}
      titleText="Edit Word"
      buttonText="Save changes"
      onUpdate={onUpdate}
    />
  );
};

export default EditWordForm;
