import { Course } from '@/features/courses/types/course.type';
import { Level } from '@/features/levels/types/level/level.type';
import { VALIDATION_ERRORS } from '@/shared/constants/validationErrors.consts';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Autocomplete, Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type ModalAddNewFormProps = {
  open: boolean;
  handleClose: () => void;
  course?: Course;
};
type FormValues = {
  title: string;
  description: string;
  level: Level | null;
  status: CourseStatus | null;
  image: string;
};
const status = ['Draft', 'Published'] as const;
type CourseStatus = (typeof status)[number];
const getLevels = async () => {
  const response = await fetch('/api/level', {
    method: 'GET',
  });
  //console.log(response);

  const result = await response.json();
  console.log(result);
  return result;
};

export default function ModalAddNewForm({ open, handleClose, course }: ModalAddNewFormProps) {
  const [levelsData, setLevelsData] = useState<Level[]>([]);
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });

  const convertCourseFormDataToAPIFormat = (data: FormValues) => {
    return {
      name: data.title,
      description: data.description,
      status: data.status?.toLowerCase(),
      LevelId: String(data.level?.id),
    };
  };

  const onSubmit = (data: FormValues) => addCourse(data);

  const addCourse = async (data: FormValues) => {
    const response = await fetch('/api/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertCourseFormDataToAPIFormat(data)),
    });

    const result = await response.json();
    console.log(result);
  };
  useEffect(() => {
    getLevels().then((responce) => {
      setLevelsData(responce.items);
    });
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sxStyles.modal}>
          <Typography id="modal-modal-title" variant="h3">
            {course ? 'Edit Course' : 'Add New Course'}
          </Typography>
          <Typography color={'primary'} id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            {course
              ? 'Edit Course. you can edit lessons later'
              : 'Create a new course. You can add lessons after creating the course.'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={sxStyles.form}>
            {/* <Grid2 size={6}> */}
            <Controller
              name="title"
              control={control}
              rules={{ required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
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
              rules={{ required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
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
              rules={{ required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
              render={({ field: { onChange, value }, formState: { errors } }) => (
                <Autocomplete
                  sx={sxStyles.select}
                  options={levelsData}
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
              rules={{ required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
              render={({ field: { onChange, value }, formState: { errors } }) => (
                <Autocomplete
                  sx={sxStyles.select}
                  options={status}
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
              rules={{ required: { value: true, message: VALIDATION_ERRORS.REQUIRED } }}
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
        </Box>
      </Modal>
    </>
  );
}

const sxStyles = createSxStylesList({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
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
