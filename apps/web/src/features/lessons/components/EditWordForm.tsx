import { WordFormValues } from './AddWordForm';
import { Word } from './CreateVocabularySectionModal';
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
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WordType } from '../enums/lessonWordType.enum';
import { FORM_VALIDATION_ERRORS } from '@/shared/constants/formValidationErrors.const';
import { WORD_TYPE_LIST } from '../constants/lessonWortTypeList.const';
type EditWordFormProps = {
  word: Word;
  close: () => void;
  ind: number;
};

function EditWordForm({ word, close, ind }: EditWordFormProps) {
  const getDefaultValues = (word: Word, ind: number): WordFormValues => ({
    word: word.word,
    translation: word.translation,
    transcription: word.transcription,
    type: word.type,
    partOfSpeech: word.partOfSpeech,
    secondTense: word?.secondTense,
    thirdTense: word?.thirdTense,
    examples: [{ value: word.examples[ind].value, translation: word.examples[ind].translation }],
  });
  const id = React.useId();
  const { handleSubmit, control, reset } = useForm<WordFormValues>({
    defaultValues: getDefaultValues(word, ind),
  });
  const { fields, update } = useFieldArray({
    control,
    name: 'examples',
  });
  const [autoCompleteValue, setAutoCompleteValue] = useState<WordType | null>(null);
  return (
    <Box sx={{}}>
      <Typography variant="h4" sx={{ textAlign: 'center', margin: '10px 0' }}>
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
            render={({ field, formState: { errors } }) => (
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
                  (onChange(newValue), setAutoCompleteValue(newValue));
                }}
                value={value}
                getOptionLabel={(option) => capitalizeWords(option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="partOfSpeech"
                    error={!!errors.partOfSpeech}
                    helperText={errors.partOfSpeech?.message}
                  />
                )}
              />
            )}
          />
        </Grid>
        {autoCompleteValue == 'verb' ? (
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
        ) : (
          <></>
        )}
        {autoCompleteValue == 'verb' ? (
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
        ) : (
          <></>
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
            <Grid container spacing={2} key={item.id}>
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
                      // error={!!errors.examples[index].value}
                      // helperText={errors.thirdTense?.message}
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
      <Button
        // onClick={handleSubmit(onSubmit)}
        sx={sxStyles.submitButton}
        onClick={close}
      >
        Save changes
      </Button>
    </Box>
  );
}
const sxStyles = createSxStylesList({
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
