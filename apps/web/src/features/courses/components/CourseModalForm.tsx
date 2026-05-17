import { FC } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FORM_VALIDATION_ERRORS } from '@/shared/constants/formValidationErrors.const';
import { COURSE_STATUSES_LIST } from '../constants/courseStatusesList.const';
import { capitalizeWords } from '@/shared/helpers/string.helper';
import { CourseFormValues } from '../types/courseForm.type';
import { Level } from '@/features/levels/types/level.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type CourseModalFormProps = {
  control: Control<CourseFormValues>;
  levelsList: Level[];
};

const CourseModalForm: FC<CourseModalFormProps> = ({ control, levelsList }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="name"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              placeholder="e.g., Advanced Grammar Mastery"
              label="Course title"
              size="small"
              variant="outlined"
              sx={sxStyles.field}
              error={!!errors.name}
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="level"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={levelsList}
              getOptionLabel={(option) => `${option.cefrLevel} - ${option.name}`}
              sx={sxStyles.fullWidth}
              size="small"
              onChange={(_, newValue) => onChange(newValue)}
              value={value}
              renderInput={(params) => (
                <TextField {...params} label="Level" error={!!errors.level} />
              )}
            />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="status"
          rules={{ required: { value: true, message: FORM_VALIDATION_ERRORS.requiredField } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={COURSE_STATUSES_LIST}
              sx={sxStyles.fullWidth}
              size="small"
              onChange={(_, newValue) => onChange(newValue)}
              value={value}
              getOptionLabel={(option) => capitalizeWords(option)}
              renderInput={(params) => (
                <TextField {...params} label="Status" error={!!errors.status} />
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

export default CourseModalForm;
