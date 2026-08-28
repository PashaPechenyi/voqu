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
import { useMutation } from '@/shared/api';
import { updateCourseReq } from '../helpers/updateCourseReq.helper';

type UpdateCourseModalProps = {
  open: boolean;
  onClose: () => void;
  course: Course;
  onUpdateSuccess: (data: Course) => void;
};

const COURSE_STATUSES = Object.values(CourseStatusKey);

function UpdateCourseModal({ open, onClose, course, onUpdateSuccess }: UpdateCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: course.name,
      // TODO: description is populated from course.createdAt and image from course.updatedAt — wrong source fields; level is not prefilled
      description: '/description/',
      level: null,
      status: course.status,
      image: '/image/',
    },
  });
  const { levelsList, getLevelsList } = useLevelsList();
  const { isLoading, mutate: updateCourse } = useMutation({
    mutationFn: updateCourseReq,
    onSuccess(data) {
      onUpdateSuccess(data.course);
    },
  });

  const onSubmit = (formValues: CourseFormValues) => {
    updateCourse(course.id, convertCourseFormToApiFormat(formValues));
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    getLevelsList();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h3">Update Course</Typography>
        <Typography color="primary" sx={{ mt: 2, mb: 2 }}>
          Update course. You can update lessons later.
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

export default UpdateCourseModal;
