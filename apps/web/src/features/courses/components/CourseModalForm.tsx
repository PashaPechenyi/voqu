import { Autocomplete, Grid, TextField } from '@mui/material';

import { Control, Controller } from 'react-hook-form';
import { ERROR_MESSAGE } from '../constants/errorMessage.const';
import { COURSE_STATUSES_LIST } from '../constants/courseStatus.const';
import { capitalizeFirstLetter } from '@/shared/helpers/string.helpers';
import { CourseFormValues } from './CourseAddModal';
import { Level } from '@/features/levels/types/level.type';

type CourseModalFormProps = {
  control: Control<CourseFormValues, any, CourseFormValues>;
  levelsList: Level[];
};

function CourseModalForm({ control, levelsList }: CourseModalFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="name"
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              placeholder="e.g., AdvancedGrammar Mastery"
              label="Course title"
              size="small"
              variant="outlined"
              sx={{ width: 1, borderRadius: '30px' }}
              error={!!errors.name}
              helperText={errors.name?.message}
              {...field}
            ></TextField>
          )}
        />
      </Grid>

      {/* <Grid size={12}>
        <Controller
          control={control}
          name="description"
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Description"
              variant="outlined"
              rows={4}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ width: 1, borderRadius: '30px' }}
              {...field}
            ></TextField>
          )}
        />
      </Grid> */}

      <Grid size={6}>
        <Controller
          control={control}
          name="level"
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={levelsList}
              getOptionLabel={(option) => `${option.cefrLevel} - ${option.name}`}
              sx={{ width: 1 }}
              size="small"
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
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
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={COURSE_STATUSES_LIST}
              sx={{ width: 1 }}
              size="small"
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              value={value}
              getOptionLabel={(option) => capitalizeFirstLetter(option)}
              renderInput={(params) => (
                <TextField {...params} label="Status" error={!!errors.status} />
              )}
            />
          )}
        />
      </Grid>
      {/* <Grid size={12}>
        <Controller
          control={control}
          name="link"
          render={({ field }) => (
            <TextField
              label="Image URL (optional)"
              size="small"
              variant="outlined"
              placeholder="https://..."
              rows={4}
              sx={{ width: 1, borderRadius: '30px' }}
              {...field}
            ></TextField>
          )}
        />
      </Grid> */}
    </Grid>
  );
}

export default CourseModalForm;
