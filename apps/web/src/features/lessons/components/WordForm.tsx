import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WordFormValues } from '../types/wordForm.type';
import { WordType } from '../enums/lessonWordType.enum';
import { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FORM_VALIDATION_ERRORS } from '@/shared/constants/formValidationErrors.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { capitalizeWords } from '@/shared/helpers/string.helper';
import { WORD_TYPE_LIST } from '../constants/lessonWordTypeList.const';
import { Segment, Wordlist } from '../types/lessonDetails.type';
import { convertFormWord } from '../helpers/convertFormWord.helper';
import { Word } from '../types/word.type';

type WordFormProps = {
  defaultValues: WordFormValues;
  titleText: string;
  buttonText: string;
  onSubmit?: (values: WordFormValues) => void;
  onUpdate?: (body: Partial<Segment>) => void;
  wordlist?: Wordlist;
  word?: Word;
};
const WordForm = ({
  defaultValues,
  titleText,
  buttonText,
  onUpdate,
  onSubmit,
  wordlist,
  word,
}: WordFormProps) => {
  const { handleSubmit, control, reset } = useForm<WordFormValues>({
    defaultValues: defaultValues,
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'examples',
  });
  const radioGroupLabels: { value: string; label: string }[] = [
    { value: 'word', label: 'Word' },
    { value: 'phrase', label: 'Phrase' },
  ];
  const [autoCompleteValue, setAutoCompleteValue] = useState<WordType | null>(null);
  return (
    <Box>
      <Typography variant="h4" sx={sxStyles.heading}>
        {titleText}
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
                  {radioGroupLabels.map((el) => (
                    <FormControlLabel value={el.value} control={<Radio />} label={el.label} />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="partOfSpeech"
            rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <Autocomplete
                options={WORD_TYPE_LIST}
                // sx={sxStyles.fullWidth}
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
        <br />
        {autoCompleteValue === WordType.Verb && (
          <Grid size={6}>
            <Controller
              control={control}
              name="secondTense"
              rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  label="Second Tense"
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
                  label="Third Tense"
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
            <Grid sx={{ mb: '20px' }} container spacing={1} key={item.id}>
              <Grid size={12} sx={{ display: 'flex', gap: '20px' }}>
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
                      fullWidth
                    />
                  )}
                  name={`examples.${index}.text.value`}
                  control={control}
                />
                <IconButton
                  sx={{ height: 30, width: 30 }}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <ClearIcon />
                </IconButton>
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
                      fullWidth
                    />
                  )}
                  name={`examples.${index}.text.translation`}
                  control={control}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        onClick={() => prepend({ id: '', order: 1, text: { value: '', translation: '' } })}
      >
        Add example
      </Button>
      <br />
      <Button
        onClick={handleSubmit((values) => {
          {
            wordlist
              ? onUpdate?.({
                  wordlist: {
                    ...wordlist,
                    entries: wordlist.entries.map((el) =>
                      el.definition.value === word?.definition.value ? convertFormWord(values) : el,
                    ),
                  },
                })
              : onSubmit?.(values);
          }
          reset();
        })}
        sx={sxStyles.submitButton}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  heading: { textAlign: 'center', margin: '10px 0' },
  exampleRow: { mb: '20px' },
  field: { width: '40%', borderRadius: '30px' },
  fullWidth: { width: 1 },
  submitButton: (theme) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    p: '10px',
    m: '10px 0',
  }),
});

export default WordForm;
