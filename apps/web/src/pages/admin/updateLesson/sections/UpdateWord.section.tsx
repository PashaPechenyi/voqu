import { VALIDATION_ERRORS } from '@/shared/constants/validationErrors.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WordFormValues } from './AddWord.section';
import { Word } from './VocabularyForm.section';
type UpdateWordSectionProps = {
  wordItem: Word | null;
  setWordlist: React.Dispatch<React.SetStateAction<Word[]>>;
};
export const UpdateWordSection = ({ wordItem, setWordlist }: UpdateWordSectionProps) => {
  if (!wordItem) return <></>;
  const { handleSubmit, control, reset } = useForm<WordFormValues>({
    defaultValues: {
      word: wordItem.word,
      transcription: wordItem.transcription,
      partOfSpeech: wordItem.partOfSpeech,
      translation: wordItem.translation,
      type: wordItem.type,
      secondTense: wordItem.secondTense,
      thirdTense: wordItem.thirdTense,
      examples: wordItem.examples,
    },
  });
  const { fields } = useFieldArray({
    control,
    name: 'examples',
  });
  const formValuesToStateFormat = (formValues: WordFormValues) => {
    const id = formValues.word + 'Id';
    return {
      id: id,
      ...formValues,
    };
  };
  const onSubmit = (formValues: WordFormValues) => {
    // setWordlist((prev) => {
    //   return prev.find(wordListItem => wordListItem.id === wordItem.id ? )
    // });
    reset();
  };
  const requiredRule = { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } };

  return (
    <Box sx={sxStyles.root} bgcolor="">
      <Typography variant="h6" align="center" m={1}>
        Edit Word
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={sxStyles.controllersRoot}>
          <Box sx={sxStyles.constrollersGroup}>
            <Controller
              rules={requiredRule}
              name="word"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  error={!!errors.word}
                  helperText={errors.word?.message}
                  color="primary"
                  variant="filled"
                  placeholder="Word"
                  label="Word"
                  {...field}
                />
              )}
            />
            <Controller
              rules={requiredRule}
              name="transcription"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  error={!!errors.transcription}
                  helperText={errors.transcription?.message}
                  color="primary"
                  variant="filled"
                  placeholder="Transcription"
                  {...field}
                />
              )}
            />
            <Controller
              rules={requiredRule}
              name="partOfSpeech"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  error={!!errors.partOfSpeech}
                  helperText={errors.partOfSpeech?.message}
                  color="primary"
                  variant="filled"
                  placeholder="Part of speech"
                  {...field}
                />
              )}
            />
            <Controller
              rules={requiredRule}
              name="translation"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  error={!!errors.translation}
                  helperText={errors.translation?.message}
                  color="primary"
                  variant="filled"
                  placeholder="Translation"
                  {...field}
                />
              )}
            />
            <Controller
              rules={requiredRule}
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} defaultValue="word">
                  <FormControlLabel value="phrase" control={<Radio />} label="Phrase" />
                  <FormControlLabel value="word" control={<Radio />} label="Word" />
                </RadioGroup>
              )}
            />
          </Box>

          <Box sx={sxStyles.constrollersGroup}>
            <Controller
              rules={requiredRule}
              name="secondTense"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  error={!!errors.secondTense}
                  helperText={errors.secondTense?.message}
                  color="primary"
                  variant="filled"
                  placeholder="Second tense"
                  {...field}
                />
              )}
            />
            <Controller
              rules={requiredRule}
              name="thirdTense"
              control={control}
              render={({ field, formState: { errors } }) => (
                <TextField
                  error={!!errors.thirdTense}
                  helperText={errors.thirdTense?.message}
                  color="primary"
                  variant="filled"
                  placeholder="Third tense"
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={sxStyles.constrollersGroup}>
            {fields.map((field, index) => (
              <Box
                sx={sxStyles.constrollersGroup}
                key={field.id} // important to include key with field's id
              >
                <Typography variant="body1">Examples</Typography>
                <Controller
                  render={({ field }) => (
                    <TextField
                      color="primary"
                      variant="filled"
                      placeholder={`${index + 1} example`}
                      {...field}
                    />
                  )}
                  name={`examples.${index}.value`}
                  control={control}
                />
                <Controller
                  rules={requiredRule}
                  render={({ field }) => (
                    <TextField
                      color="primary"
                      variant="filled"
                      placeholder="ex. translation"
                      {...field}
                    />
                  )}
                  name={`examples.${index}.translation`}
                  control={control}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Button sx={{ width: '100%', mt: 2 }} type="submit" variant="contained" size="large">
          Save
        </Button>
      </Box>
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
  controllersRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  constrollersGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
});
