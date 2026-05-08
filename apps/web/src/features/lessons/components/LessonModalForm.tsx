import { ERROR_MESSAGE } from '@/features/courses/constants/errorMessage.const';
import { capitalizeFirstLetter } from '@/shared/helpers/string.helpers';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { LESSON_TYPE_LIST } from '../constants/lessonType.constant';
import { LessonFormValues } from './LessonAddModal';

type LessonModalFormProps = {
  control: Control<LessonFormValues, any, LessonFormValues>;
};

function LessonModalForm({ control }: LessonModalFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={control}
          name="title"
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Course title"
              size="small"
              variant="outlined"
              sx={{ width: 1, borderRadius: '30px' }}
              error={!!errors.title}
              helperText={errors.title?.message}
              {...field}
            ></TextField>
          )}
        />
      </Grid>

      {/* <Grid size={6}>
        <Controller
          control={control}
          name="duration"
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Duration"
              variant="outlined"
              rows={4}
              error={!!errors.duration}
              helperText={errors.duration?.message}
              placeholder='Duration'
              sx={{ width: 1, borderRadius: '30px' }}
              {...field}
            ></TextField>
          )}
        />
      </Grid> */}

      <Grid size={6}>
        <Controller
          control={control}
          name="type"
          rules={{ required: { value: true, message: ERROR_MESSAGE.message } }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Autocomplete
              options={LESSON_TYPE_LIST}
              sx={{ width: 1 }}
              size="small"
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              value={value}
              getOptionLabel={(option) => capitalizeFirstLetter(option)}
              renderInput={(params) => <TextField {...params} label="Type" error={!!errors.type} />}
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

export default LessonModalForm;
