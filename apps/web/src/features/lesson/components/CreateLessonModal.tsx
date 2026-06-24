import { Box, Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonSegmentType } from '../types/lessonSegmentType.type';
import { LessonFormValues } from '../types/lessonFormValues.type';
import { convertLessonFormToApiFormat } from '../helpers/convertLessonFormToApiFormat.helper';
import { LessonListItem } from '../types/lessonListItem.type';
import { Course } from '@/features/courses/types/course.type';
import { Controller, useForm } from 'react-hook-form';
import { VALIDATION_ERRORS } from '@/shared/constants/validationErrors.const';
import { createLessonReq } from '../helpers/createLessonReq.helper';
import { useMutation } from '@/shared/api';

const LESSON_SEGMENT_TYPES = Object.values(LessonSegmentType);

type CreateLessonModalProps = {
  open: boolean;
  onClose: () => void;
  onCreateSuccess?: (lesson: LessonListItem) => void;
  courseId: Course['id'];
};

function CreateLessonModal({ open, onClose, onCreateSuccess, courseId }: CreateLessonModalProps) {
  const { isLoading, mutate: createLesson } = useMutation({
    mutationFn: createLessonReq,
    onSuccess: (response) => {
      onCreateSuccess(response.lesson);
    },
  });

  const { handleSubmit, control, reset } = useForm<LessonFormValues>({
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      duration: '',
      segmentType: LessonSegmentType.reading,
    },
  });

  const onSubmit = (formValues: LessonFormValues) => {
    createLesson(courseId, convertLessonFormToApiFormat(formValues));
    console.log(convertLessonFormToApiFormat(formValues));
  };

  const requiredRule = { required: { value: true, message: VALIDATION_ERRORS.REQUIRED } };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h4" fontWeight={700}>
          Create Lesson
        </Typography>

        <Typography color="primary" sx={{ mt: 1, mb: 4 }}>
          Create a new lesson for this course.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                name="subtitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="primary"
                    fullWidth
                    variant="filled"
                    placeholder="Subtitle"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    color="primary"
                    multiline
                    minRows={4}
                    variant="filled"
                    placeholder="Description"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="duration"
                control={control}
                rules={requiredRule}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    color="primary"
                    type="number"
                    required
                    variant="filled"
                    label="Duration"
                    placeholder="e.g. 15 min"
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="segmentType"
                control={control}
                rules={requiredRule}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    color="primary"
                    select
                    variant="filled"
                    label="Segment Type"
                    error={!!errors.segmentType}
                    helperText={errors.segmentType?.message}
                  >
                    {LESSON_SEGMENT_TYPES.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={sxStyles.actions}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" variant="contained" loading={isLoading}>
                  Create Lesson
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
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
    border: '2px solid',
    borderColor: 'divider',
    boxShadow: 24,
    p: 4,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 2,
    flexWrap: 'wrap',
  },
});

export default CreateLessonModal;
