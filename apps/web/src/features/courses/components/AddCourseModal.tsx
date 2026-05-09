import useGetLevelsList from '@/features/levels/hooks/useGetLevelsList';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CourseForm from './CourseForm';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';
import { convertCourseFormDataToAPIFormat } from '../helpers/convertCourseFormDataToAPIFormat';

type AddCourseModalProps = {
  open: boolean;
  handleClose: () => void;
};
const statusesList = Object.values(CourseStatusKey);
export default function AddCourseModal({ open, handleClose }: AddCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsData, fetchLevels } = useGetLevelsList();

  const onSubmit = (data: CourseFormValues) => {
    addCourse(data);
  };

  const addCourse = async (data: CourseFormValues) => {
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
    fetchLevels();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={sxStyles.modal}>
          <Typography variant="h3">Add New Course</Typography>
          <Typography color={'primary'} id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Create a new course. You can add lessons after creating the course.
          </Typography>

          <CourseForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            levelsOptions={levelsData}
            statusesOptions={statusesList}
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
});
