import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLevelsList } from '@/features/levels/hooks/useLevelsList';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import CourseForm from './CourseForm';
import { Course } from '../types/course.type';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';
import { convertCourseFormToApiFormat } from '../helpers/convertCourseFormToApiFormat.helper';
import { useCreateCourse } from '../hooks/useCreateCourse';

type CreateCourseModalProps = {
  open: boolean;
  onClose: () => void; // RENAME: handleClose -> onClose - event-emitting prop must start with 'on'
  onCreateSuccess?: (course: Course) => void; // RENAME: onCreated -> onCreateSuccess - present-tense on<Verb>Success
};

const COURSE_STATUSES = Object.values(CourseStatusKey);

// RENAME: AddCourseModal -> CreateCourseModal - 'create' is the canonical create verb
function CreateCourseModal({ open, onClose, onCreateSuccess }: CreateCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsList, getLevelsList } = useLevelsList();
  const { createCourse, isLoading } = useCreateCourse({ onSuccess: onCreateSuccess });

  const onSubmit = (formValues: CourseFormValues) => {
    createCourse(convertCourseFormToApiFormat(formValues));
  };

  // TODO: this fetches levels on mount regardless of `open`. A modal should request its data only
  // when opened. Gate on the open prop: `useEffect(() => { if (!open) return; getLevelsList(); }, [open]);`
  useEffect(() => {
    getLevelsList();
  }, [getLevelsList]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h3">Create Course</Typography>
        <Typography color="primary" sx={{ mt: 2, mb: 2 }}>
          Create a new course. You can add lessons after creating the course.
        </Typography>

        <CourseForm
          isLoading={isLoading}
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          levelsOptions={levelsList}
          statusesOptions={COURSE_STATUSES}
        />
      </Box>
    </Dialog>
  );
}

const sxStyles = createSxStylesList({
  modal: {
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'divider',
    boxShadow: 24,
    p: 4,
  },
});

export default CreateCourseModal;
