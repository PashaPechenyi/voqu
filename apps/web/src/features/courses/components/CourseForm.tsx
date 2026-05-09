import { Level } from '@/features/levels/types/level/level.type';
import { VALIDATION_ERRORS } from '@/shared/constants/validationErrors.consts';
import { createSxStylesList } from '@/theme/helpers';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';

type CourseFormProps = {
  control: Control<CourseFormValues, any, CourseFormValues>;
  onSubmit: () => void;
  levelsOptions: Level[];
  statusesOptions: CourseStatusKey[];
  edit?: boolean;
};

export default function CourseForm({
  control,
  onSubmit,
  statusesOptions,
  levelsOptions,
  edit,
}: CourseFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={sxStyles.form}>
      {/* <Grid2 size={6}> */}
      <Controller
        name="title"
        control={control}
        rules={edit ? {} : { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
        render={({ field, formState: { errors } }) => {
          console.log(errors, 'errors');
          return (
            <TextField
              color="primary"
              sx={sxStyles.textField}
              variant="filled"
              placeholder="Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...field}
            />
          );
        }}
      />
      {/* </Grid2>
  <Grid2 size={6}> */}
      <Controller
        name="description"
        control={control}
        rules={edit ? {} : { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
        render={({ field, formState: { errors } }) => (
          <TextField
            sx={sxStyles.textField}
            variant="filled"
            placeholder="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...field}
          />
        )}
      />

      {/* </Grid2>
   <Grid2 size="6" sx={sxStyles.selectBox}> */}
      <Controller
        name="level"
        control={control}
        rules={edit ? {} : { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <Autocomplete
            sx={sxStyles.select}
            options={levelsOptions}
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={sxStyles.textField}
                variant="filled"
                label="Status"
                error={!!errors.level}
                helperText={errors.level?.message}
              />
            )}
          />
        )}
      />
      {/* </Grid2>
  <Grid2 size="6" sx={sxStyles.selectBox}> */}

      <Controller
        name="status"
        control={control}
        rules={edit ? {} : { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <Autocomplete
            sx={sxStyles.select}
            options={statusesOptions}
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={sxStyles.textField}
                variant="filled"
                label="Status"
                error={!!errors.status}
                helperText={errors.status?.message}
              />
            )}
          />
        )}
      />
      {/* </Grid2>
  <Grid2 size='10'> */}
      <Controller
        name="image"
        control={control}
        rules={edit ? {} : { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
        render={({ field, formState: { errors } }) => (
          <TextField
            sx={sxStyles.textField}
            variant="filled"
            placeholder="Image URL"
            error={!!errors.image}
            helperText={errors.image?.message}
            {...field}
          />
        )}
      />
      {/* </Grid2> */}
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}
const sxStyles = createSxStylesList({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mb: 2,
  },
  textField: {
    width: '100%',
  },
  selectBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    flex: 1,
  },
  select: {
    width: '50%',
  },
});
