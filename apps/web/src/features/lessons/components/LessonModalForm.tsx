import { FC } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FORM_VALIDATION_ERRORS } from '@/shared/constants/formValidationErrors.const';
import { capitalizeWords } from '@/shared/helpers/string.helper';
import { LESSON_TYPE_LIST } from '../constants/lessonTypeList.const';
import { LessonFormValues } from '../types/lessonForm.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LESSON_STATUSES_LIST } from '../constants/lessonStatusesList.const';

type LessonModalFormProps = {
  control: Control<LessonFormValues>;
};

const LessonModalForm: FC<LessonModalFormProps> = ({ control }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="title"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Lesson title"
              size="small"
              variant="outlined"
              sx={sxStyles.field}
              error={!!errors.title}
              helperText={errors.title?.message}
              {...field}
            />
          )}
        />
      </Grid>
      {/* <Grid size={6}>
        <Controller
          control={control}
          name="type"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={LESSON_TYPE_LIST}
              sx={sxStyles.fullWidth}
              size="small"
              onChange={(_, newValue) => onChange(newValue)}
              value={value}
              getOptionLabel={(option) => capitalizeWords(option)}
              renderInput={(params) => <TextField {...params} label="Type" error={!!errors.type} />}
            />
          )}
        />
      </Grid> */}
      <Grid size={12}>
        <Controller
          control={control}
          name="subtitle"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Lesson subtitle"
              size="small"
              variant="outlined"
              sx={sxStyles.field}
              error={!!errors.subtitle}
              helperText={errors.subtitle?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={control}
          name="description"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Lesson description"
              size="small"
              variant="outlined"
              sx={sxStyles.field}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={control}
          name="status"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={LESSON_STATUSES_LIST}
              sx={sxStyles.fullWidth}
              size="small"
              onChange={(_, newValue) => onChange(newValue)}
              value={value}
              getOptionLabel={(option) => capitalizeWords(option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

const sxStyles = createSxStylesList({
  field: { width: 1, borderRadius: '30px' },
  fullWidth: { width: 1 },
});

export default LessonModalForm;
