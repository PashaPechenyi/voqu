import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Level } from '@/features/levels/types/level.type';
import { VALIDATION_ERRORS } from '@/shared/constants/validationErrors.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';

type CourseFormProps = {
  control: Control<CourseFormValues>;
  onSubmit: () => void;
  levelsOptions: Level[];
  statusesOptions: CourseStatusKey[];
  edit?: boolean;
};

function CourseForm({
  control,
  onSubmit,
  statusesOptions,
  levelsOptions,
  edit,
}: CourseFormProps) {
  const requiredRule = edit ? {} : { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } };

  return (
    <Box component="form" onSubmit={onSubmit} sx={sxStyles.form}>
      <Controller
        name="title"
        control={control}
        rules={requiredRule}
        render={({ field, formState: { errors } }) => (
          <TextField
            color="primary"
            sx={sxStyles.textField}
            variant="filled"
            placeholder="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={requiredRule}
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
      <Controller
        name="level"
        control={control}
        rules={requiredRule}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <Autocomplete
            sx={sxStyles.select}
            options={levelsOptions}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={sxStyles.textField}
                variant="filled"
                label="Level"
                error={!!errors.level}
                helperText={errors.level?.message}
              />
            )}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        rules={requiredRule}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <Autocomplete
            sx={sxStyles.select}
            options={statusesOptions}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
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
      <Controller
        name="image"
        control={control}
        rules={requiredRule}
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
  select: {
    width: '50%',
  },
});

export default CourseForm;
