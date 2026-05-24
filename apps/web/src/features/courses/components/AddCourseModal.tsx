import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLevelsList } from '@/features/levels/hooks/useLevelsList';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import CourseForm from './CourseForm';
import { Course } from '../types/course.type';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';
import { courseFormToReqBody } from '../helpers/courseFormToReqBody.helper';
import { useCreateCourse } from '../hooks/useCreateCourse';

type AddCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  onCreated?: (course: Course) => void;
};

const COURSE_STATUSES = Object.values(CourseStatusKey);

function AddCourseModal({ open, handleClose, onCreated }: AddCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsList, fetchLevels } = useLevelsList();
  const { createCourse, isLoading } = useCreateCourse({ onSuccess: onCreated });

  const onSubmit = (formValues: CourseFormValues) => {
    createCourse(courseFormToReqBody(formValues));
  };

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={sxStyles.modal}>
          <Typography variant="h3">Add New Course</Typography>
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
    </>
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

export default AddCourseModal;
