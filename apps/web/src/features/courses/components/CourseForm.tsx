// TODO: Imports `createSxStylesList` from `@/theme/helpers` — the project has a duplicate at `@/shared/helpers/styles/createSxStylesList.helper`. The rest of the file's "neighborhood" uses the shared one. Standardize on one path everywhere.
// TODO: All commented-out `<Grid2>` markup must be removed — dead code makes the file unreadable. Either rebuild the grid layout or delete the comments.
// TODO: `console.log(errors, 'errors')` inside the `render` callback runs on every keystroke — remove.
// TODO: `Control<CourseFormValues, any, CourseFormValues>` — second generic is `any`. Either omit (default is fine) or pass the context type.
// TODO: Same-named `<Autocomplete>` for level and status both use `label="Status"` — the level field is mislabeled "Status" too. Should be "Level".
// TODO: Validation rules differ between add and edit via the `edit?: boolean` prop. Lift this into a parent-provided `rules` prop or let the parent pass the resolver — leaking the "is it add or edit" knowledge into a generic form is wrong.
// TODO: Image is a plain `TextField` for an arbitrary URL. Either accept upload or validate the URL with the shared `VALIDATION_ERRORS` regex.
// TODO: No loading state on the submit button while a `fetch` is in flight (the parent doesn't track it either).
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
