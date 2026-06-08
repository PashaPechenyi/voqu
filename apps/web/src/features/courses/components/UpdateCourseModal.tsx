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
import { useUpdateCourse } from '../hooks/useUpdateCourse';

type UpdateCourseModalProps = {
  open: boolean;
  onClose: () => void; // RENAME: handleClose -> onClose - event-emitting prop must start with 'on'
  course: Course;
  onUpdateSuccess: (course: Course) => void; // RENAME: onSuccess -> onUpdateSuccess - present-tense on<Verb>Success; 'onSuccess' is hook-only vocabulary
};

const COURSE_STATUSES = Object.values(CourseStatusKey);

// RENAME: EditCourseModal -> UpdateCourseModal - 'update' is the canonical mutation verb
function UpdateCourseModal({ open, onClose, course, onUpdateSuccess }: UpdateCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: course.name,
      // TODO: description is populated from course.createdAt and image from course.updatedAt — wrong source fields; level is not prefilled
      description: course.createdAt,
      level: null,
      status: course.status,
      image: course.updatedAt,
    },
  });
  const { levelsList, getLevelsList } = useLevelsList();
  const { updateCourse, isLoading } = useUpdateCourse({ onSuccess: onUpdateSuccess });

  const onSubmit = (formValues: CourseFormValues) => {
    updateCourse(course.id, convertCourseFormToApiFormat(formValues));
    onClose();
  };

  // TODO: this fetches levels on mount regardless of `open`. A modal should request its data only
  // when opened. Gate on the open prop: `useEffect(() => { if (!open) return; getLevelsList(); }, [open]);`
  useEffect(() => {
    getLevelsList();
  }, [getLevelsList]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h3">Update Course</Typography>
        <Typography color="primary" sx={{ mt: 2, mb: 2 }}>
          Update course. You can update lessons later.
        </Typography>

        <CourseForm
          update
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

export default UpdateCourseModal;
