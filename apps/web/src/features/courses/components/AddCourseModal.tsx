import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useGetLevels from '@/features/levels/hooks/useGetLevels';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import CourseForm from './CourseForm';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';
import { convertCourseFormDataToAPIFormat } from '../helpers/convertCourseFormDataToAPIFormat';

type AddCourseModalProps = {
  open: boolean;
  handleClose: () => void;
};

const COURSE_STATUSES = Object.values(CourseStatusKey);

function AddCourseModal({ open, handleClose }: AddCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsList, fetchLevels } = useGetLevels();

  const addCourse = async (data: CourseFormValues) => {
    await fetch('/api/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertCourseFormDataToAPIFormat(data)),
    });
  };

  const onSubmit = (data: CourseFormValues) => {
    addCourse(data);
  };

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h3">Add New Course</Typography>
        <Typography color="primary" sx={{ mt: 2, mb: 2 }}>
          Create a new course. You can add lessons after creating the course.
        </Typography>

        <CourseForm
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

export default AddCourseModal;
