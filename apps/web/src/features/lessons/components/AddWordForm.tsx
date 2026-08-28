import { FC } from 'react';
import { WordFormValues } from '../types/wordForm.type';
import WordForm from './WordForm';

type AddWordFormProps = {
  onSubmit?: (values: WordFormValues) => void;
};

const DEFAULT_VALUES: WordFormValues = {
  word: '',
  translation: '',
  transcription: '',
  type: null,
  partOfSpeech: null,
  secondTense: '',
  thirdTense: '',
  examples: [
    {
      id: '',
      order: null,
      text: {
        value: '',
        translation: '',
      },
    },
  ],
};

const AddWordForm: FC<AddWordFormProps> = ({ onSubmit }) => {
  return (
    <WordForm
      titleText="Add Word"
      buttonText="Add word"
      onSubmit={onSubmit}
      defaultValues={DEFAULT_VALUES}
    />
  );
};

export default AddWordForm;
