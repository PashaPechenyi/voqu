import { Word } from '@/features/lesson/types/wordListItem.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Typography } from '@mui/material';
import { formValuesToStateFormat } from './AddWord.section';
import { WordForm, WordFormValues } from './WordForm';

type UpdateWordSectionProps = {
  wordItem: Word;
  setWordlist: React.Dispatch<React.SetStateAction<Word[]>>;
};
export const UpdateWordSection = ({ wordItem, setWordlist }: UpdateWordSectionProps) => {
  const onSubmit = (formValues: WordFormValues) => {
    console.log(setWordlist, 'setwl');
    const convertedData = formValuesToStateFormat(formValues);
    if (!convertedData) return;

    setWordlist((prev) => {
      return prev.map((prevWordItem) =>
        prevWordItem.id !== wordItem?.id ? prevWordItem : { ...prevWordItem, ...convertedData },
      );
    });
  };

  const defaultValues: WordFormValues = {
    word: wordItem.lemma,
    transcription: wordItem.transcription,
    partOfSpeech: wordItem.partOfSpeech,
    translation: wordItem.definition.value,
    type: wordItem.entryType,
    secondTense: wordItem.v2,
    thirdTense: wordItem.v3,
    examples: wordItem.examples.map((ex) => ({
      value: ex.text.value,
      translation: ex.text.translation || '',
    })),
  };

  return (
    <Box sx={sxStyles.root} bgcolor="">
      <Typography variant="h6" align="center" m={1}>
        Edit Word
      </Typography>
      <WordForm defaultValues={defaultValues} onSubmit={onSubmit} />
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
