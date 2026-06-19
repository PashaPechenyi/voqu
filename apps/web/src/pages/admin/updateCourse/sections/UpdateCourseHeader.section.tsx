import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import CreateLessonModal from '@/features/lesson/components/CreateLessonModal';
import { Course } from '@/features/courses/types/course.type';

type UpdateCourseHeaderSectionProps = {
  course: Course;
  reloadLessons: (courseId: Course['id']) => void;
};

function UpdateCourseHeaderSection({ course, reloadLessons }: UpdateCourseHeaderSectionProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreateSuccess = () => {
    reloadLessons(course.id);
    handleClose();
  };

  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h3">{course.name}</Typography>
        {/* TODO: renders the literal text "description"; should show  the data from course */}
        <Typography variant="h6" color={'adminSecondary'}>
          description
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Button sx={sxStyles.btn} variant="contained" onClick={handleOpen}>
        <AddIcon />
        Create lesson
      </Button>
      <CreateLessonModal
        onCreateSuccess={handleCreateSuccess}
        courseId={course.id}
        open={open}
        onClose={handleClose}
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

export default UpdateCourseHeaderSection;
