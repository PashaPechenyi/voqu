import { VALIDATION_ERRORS } from '@/shared/constants/validationErrors.const';
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { EntryType, PartsOfSpeechOptions } from '@/features/lesson/types/wordListItem.type';
import { useState } from 'react';
export type WordFormValues = {
  word: string;
  transcription: string;
  partOfSpeech: PartsOfSpeechOptions | null;
  translation: string;
  type: EntryType | null;
  secondTense: string | null;
  thirdTense: string | null;
  examples: {
    value: string;
    translation: string;
  }[];
};

type WordFormProps = {
  onSubmit: (formValues: WordFormValues) => void;
  defaultValues?: WordFormValues;
};
export const WordForm = ({ onSubmit, defaultValues }: WordFormProps) => {
  const [isVerb, setIsVerb] = useState(false);

  const requiredRule = { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } };
  const { handleSubmit, control, reset } = useForm<WordFormValues>({
    defaultValues: defaultValues || {
      word: '',
      transcription: '',
      partOfSpeech: null,
      translation: '',
      type: null,
      secondTense: '',
      thirdTense: '',
      examples: [
        {
          value: '',
          translation: '',
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'examples',
  });
  return (
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
                variant="standard"
                placeholder="Word"
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
                variant="standard"
                placeholder="Transcription"
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={sxStyles.constrollersGroup}>
          <Controller
            name="partOfSpeech"
            control={control}
            rules={requiredRule}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <Autocomplete
                options={Object.values(PartsOfSpeechOptions)}
                value={value}
                onChange={(_, newValue) => {
                  onChange(newValue);
                  newValue === PartsOfSpeechOptions.Verb
                    ? setIsVerb((prev) => !prev)
                    : setIsVerb(false);
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Part of speech"
                    error={!!errors.partOfSpeech}
                    helperText={errors.partOfSpeech?.message}
                  />
                )}
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
                variant="standard"
                placeholder="Translation"
                {...field}
              />
            )}
          />
        </Box>
        {isVerb && (
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
                  variant="standard"
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
                  variant="standard"
                  placeholder="Third tense"
                  {...field}
                />
              )}
            />
          </Box>
        )}

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
        <Box sx={sxStyles.row}>
          <Typography variant="body1">Examples</Typography>
          <IconButton onClick={() => append({ value: '', translation: '' })}>
            <AddIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>

        {fields.map((field, index) => (
          <Box sx={sxStyles.constrollersGroup} key={field.id}>
            <Box sx={{ ...sxStyles.row, alignItems: 'start' }}>
              <Controller
                rules={requiredRule}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '100%' }}
                    color="primary"
                    variant="standard"
                    placeholder={`${index + 1} example`}
                    {...field}
                  />
                )}
                name={`examples.${index}.value`}
                control={control}
              />
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Controller
              rules={requiredRule}
              render={({ field }) => (
                <TextField
                  color="primary"
                  variant="standard"
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
      <Button sx={{ width: '100%', mt: 2 }} type="submit" variant="contained" size="large">
        Save
      </Button>
    </Box>
  );
};
const sxStyles = createSxStylesList({
  controllersRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 3,
  },
  constrollersGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: '60%',
  },
  row: {
    display: 'flex',
    flexDireection: 'row',
    gap: 1,
    alignItems: 'center',
  },
});
