import { FC, useState } from 'react';
import { FORM_VALIDATION_ERRORS } from '@/shared/constants/formValidationErrors.const';
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
  IconButton,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WORD_TYPE_LIST } from '../constants/lessonWordTypeList.const';
import { WordType } from '../enums/lessonWordType.enum';
import ClearIcon from '@mui/icons-material/Clear';
import { WordFormValues } from '../types/wordForm.type';

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
  const { handleSubmit, control, reset } = useForm<WordFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'examples',
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState<WordType | null>(null);
  return (
    <Box>
      <Typography variant="h4" sx={sxStyles.heading}>
        Add Word
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
                  {/* TODO: it should be mapped array */}
                  <FormControlLabel value="word" control={<Radio />} label="Word" />
                  <FormControlLabel value="phrase" control={<Radio />} label="Phrase" />
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
          onSubmit?.(values);
          reset();
        })}
        sx={sxStyles.submitButton}
      >
        Add word
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

export default AddWordForm;
