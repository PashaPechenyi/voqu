import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Typography } from '@mui/material';
import { Word } from '@/features/lesson/types/wordListItem.type';
import { WordForm, WordFormValues } from './WordForm';

type AddWordSectionProps = {
  setWordlist: React.Dispatch<React.SetStateAction<Word[]>>;
};
export const formValuesToStateFormat = (formValues: WordFormValues): Word | null => {
  if (!formValues.type || !formValues.partOfSpeech) return null;

  return {
    lemma: formValues.word,
    entryType: formValues.type,
    partOfSpeech: formValues.partOfSpeech,
    transcription: formValues.transcription,
    audioUrl: '',
    definition: { value: formValues.translation, translation: '' },
    v2: formValues.secondTense,
    v3: formValues.thirdTense,
    note: {
      value: '',
      translation: '',
    },
    examples: formValues.examples.map((ex, exIndex) => ({
      text: {
        value: ex.value,
        translation: ex.translation,
      },
      order: exIndex,
    })),
  };
};
export const AddWordSection = ({ setWordlist }: AddWordSectionProps) => {
  const onSubmit = (formValues: WordFormValues) => {
    const convertedData = formValuesToStateFormat(formValues);
    if (!convertedData) return;
    setWordlist((prev) => {
      return [...prev, convertedData];
    });
    //reset();
  };

  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h6" align="center" m={1}>
        Add Word to Wordlist
      </Typography>
      <WordForm onSubmit={onSubmit} />
    </Box>
  );
};
const sxStyles = createSxStylesList({
  root: {
    width: '100%',
    border: '1px solid',
    borderRadius: 2,
    borderColor: 'primary.main',
    p: 2,
    mt: 2,
  },
});
