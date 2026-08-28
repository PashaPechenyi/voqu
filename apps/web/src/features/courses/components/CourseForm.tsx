import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
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
  isLoading: boolean;
};

function CourseForm({
  isLoading,
  control,
  onSubmit,
  statusesOptions,
  levelsOptions,
}: CourseFormProps) {
  // TODO: anti-pattern — CourseForm should not branch its validation on a caller-context flag like
  // `update`. A reusable form must not know where it is used.
  // However this condition should not exist at all:
  // the required rule should always apply (required fields are required regardless of create/update).
  // Drop the `update` prop and make `requiredRule` unconditional.
  const requiredRule = { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } };

  return (
    <Box component="form" onSubmit={onSubmit} sx={sxStyles.form}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="title"
            control={control}
            rules={requiredRule}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                color="primary"
                variant="filled"
                placeholder="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            rules={requiredRule}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                multiline
                minRows={4}
                variant="filled"
                placeholder="Description"
                color="primary"
                error={!!errors.description}
                helperText={errors.description?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="level"
            control={control}
            rules={requiredRule}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <Autocomplete
                options={levelsOptions}
                value={value}
                color="primary"
                onChange={(_, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    color="primary"
                    variant="filled"
                    label="Level"
                    error={!!errors.level}
                    helperText={errors.level?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="status"
            control={control}
            rules={requiredRule}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <Autocomplete
                options={statusesOptions}
                value={value}
                onChange={(_, newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="filled"
                    label="Status"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="image"
            control={control}
            rules={requiredRule}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                variant="filled"
                placeholder="Image URL"
                color="primary"
                error={!!errors.image}
                helperText={errors.image?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={sxStyles.actions}>
            <Button loading={isLoading} type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  form: {
    mb: 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export default CourseForm;
