import useGetLevelsList from '@/features/levels/hooks/useGetLevelsList';
import { Course } from '@/pages/admin/adminCourses/types/course.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CourseForm from './CourseForm';
import { CourseFormValues } from '../types/courseFormValues.type';
import useEditCourse from '../hooks/useEditCourse';

type EditCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  course: Course;
  onSuccess: (data: Course) => void;
};
enum CourseStatusKey {
  'Draft' = 'draft',
  'Published' = 'published',
}
const statusesList = Object.values(CourseStatusKey);

export default function EditCourseModal({
  open,
  handleClose,
  course,
  onSuccess,
}: EditCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: course.name,
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsData, fetchLevels } = useGetLevelsList();
  const { updateCourseById } = useEditCourse({ onSuccess });

  const onSubmit = (data: CourseFormValues) => {
    updateCourseById(course.id, data);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={sxStyles.modal}>
          <Typography variant="h3">Edit Course</Typography>
          <Typography color={'primary'} sx={{ mt: 2, mb: 2 }}>
            Edit Course. you can edit lessons later
          </Typography>

          <CourseForm
            edit
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
