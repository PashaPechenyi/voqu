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
import { useEditCourse } from '../hooks/useEditCourse';

type EditCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  course: Course;
  onSuccess: (course: Course) => void;
};

const COURSE_STATUSES = Object.values(CourseStatusKey);

function EditCourseModal({ open, handleClose, course, onSuccess }: EditCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: course.name,
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsList, fetchLevels } = useLevelsList();
  const { editCourse } = useEditCourse({ onSuccess });

  const onSubmit = (formValues: CourseFormValues) => {
    editCourse(course.id, courseFormToReqBody(formValues));
  };

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h3">Edit Course</Typography>
        <Typography color="primary" sx={{ mt: 2, mb: 2 }}>
          Edit course. You can edit lessons later.
        </Typography>

        <CourseForm
          edit
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

export default EditCourseModal;
