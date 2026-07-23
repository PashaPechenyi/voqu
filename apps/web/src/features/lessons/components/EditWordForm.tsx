import { capitalizeWords } from '@/shared/helpers/string.helper';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Button,
  Autocomplete,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WordType } from '../enums/lessonWordType.enum';
import { FORM_VALIDATION_ERRORS } from '@/shared/constants/formValidationErrors.const';
import { WORD_TYPE_LIST } from '../constants/lessonWordTypeList.const';
import { Word } from '../types/word.type';
import { WordFormValues } from '../types/wordForm.type';
import { FC, useState } from 'react';

// RENAME: ind (prop) -> wordIndex - descriptive camelCase prop name
type EditWordFormProps = {
  word: Word;
  close: () => void;
};

const getDefaultValues = (word: Word): WordFormValues => ({
  word: word.word,
  translation: word.translation,
  transcription: word.transcription,
  type: word.type,
  partOfSpeech: word.partOfSpeech,
  secondTense: word?.secondTense,
  thirdTense: word?.thirdTense,
  examples: word.examples,
});
const EditWordForm: FC<EditWordFormProps> = ({ word, close }: EditWordFormProps) => {
  const { control } = useForm<WordFormValues>({
    defaultValues: getDefaultValues(word),
  });
  const { fields } = useFieldArray({
    control,
    name: 'examples',
  });
  const [autoCompleteValue, setAutoCompleteValue] = useState<WordType | null>(null);
  return (
    <Box>
      <Typography variant="h4" sx={sxStyles.heading}>
        Edit Word
      </Typography>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Controller
            control={control}
            name="word"
            rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
            render={({ field, formState: { errors } }) => (
              <TextField
                label="Word"
                size="small"
                variant="outlined"
                sx={sxStyles.fullWidth}
                error={!!errors.word}
                helperText={errors.word?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="type"
            rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
            render={({ field }) => (
              <FormControl>
                <RadioGroup row {...field}>
                  <FormControlLabel value="word" control={<Radio />} label="Word" />
                  <FormControlLabel value="phrase" control={<Radio />} label="Phrase" />
                </RadioGroup>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            control={control}
            name="partOfSpeech"
            rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <Autocomplete
                options={WORD_TYPE_LIST}
                sx={sxStyles.field}
                size="small"
                onChange={(_, newValue) => {
                  onChange(newValue);
                  setAutoCompleteValue(newValue);
                }}
                value={value}
                getOptionLabel={(option) => capitalizeWords(option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Part of speech"
                    error={!!errors.partOfSpeech}
                    helperText={errors.partOfSpeech?.message}
                  />
                )}
              />
            )}
          />
        </Grid>
        {autoCompleteValue === WordType.Verb && (
          <Grid size={6}>
            <Controller
              control={control}
              name="secondTense"
              rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  label="SecondTense"
                  size="small"
                  variant="outlined"
                  sx={sxStyles.fullWidth}
                  error={!!errors.secondTense}
                  helperText={errors.secondTense?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        )}
        {autoCompleteValue === WordType.Verb && (
          <Grid size={6}>
            <Controller
              control={control}
              name="thirdTense"
              rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  label="ThirdTense"
                  size="small"
                  variant="outlined"
                  sx={sxStyles.fullWidth}
                  error={!!errors.thirdTense}
                  helperText={errors.thirdTense?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        )}
        <Grid size={6}>
          <Controller
            control={control}
            name="translation"
            rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
            render={({ field, formState: { errors } }) => (
              <TextField
                label="Word translation"
                size="small"
                variant="outlined"
                sx={sxStyles.fullWidth}
                error={!!errors.translation}
                helperText={errors.translation?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <Controller
            control={control}
            name="transcription"
            rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
            render={({ field, formState: { errors } }) => (
              <TextField
                label="Word transcription"
                size="small"
                variant="outlined"
                sx={sxStyles.fullWidth}
                error={!!errors.transcription}
                helperText={errors.transcription?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          {fields.map((item, index) => (
            <Grid container spacing={2} key={item.id} sx={{ mb: '20px' }}>
              <Grid size={12}>
                <Controller
                  rules={{
                    required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Example"
                      size="small"
                      variant="outlined"
                      sx={sxStyles.fullWidth}
                    />
                  )}
                  name={`examples.${index}.value`}
                  control={control}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  rules={{
                    required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Example translation"
                      size="small"
                      variant="outlined"
                      sx={sxStyles.fullWidth}
                    />
                  )}
                  name={`examples.${index}.translation`}
                  control={control}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* TODO: Save button only calls close() and never submits — word edits are not persisted. */}
      <Button sx={sxStyles.submitButton} onClick={close}>
        Save changes
      </Button>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  heading: { textAlign: 'center', margin: '10px 0' },
  field: { width: '40%', borderRadius: '30px' },
  fullWidth: { width: 1 },
  submitButton: (theme) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    p: '10px',
    m: '10px 0',
  }),
});

export default EditWordForm;
