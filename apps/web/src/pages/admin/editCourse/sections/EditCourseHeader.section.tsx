import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import AddNewLessonModal from '@/features/lesson/components/AddNewLessonModal';
import { Course } from '@/features/courses/types/course.type';

type EditCourseHeaderSectionProps = {
  course: Course;
  refetchLessons: (courseId: Course['id']) => void;
};

function EditCourseHeaderSection({ course, refetchLessons }: EditCourseHeaderSectionProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onCreated = () => {
    refetchLessons(course.id);
    handleClose();
  };
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h3">{course.name}</Typography>
        <Typography variant="h6" color={'adminSecondary'}>
          description
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Button sx={sxStyles.btn} variant="contained" onClick={handleOpen}>
        <AddIcon />
        Add lesson
      </Button>
      <AddNewLessonModal
        onCreated={onCreated}
        courseId={course.id}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    height: 50,
  },
});

export default EditCourseHeaderSection;
