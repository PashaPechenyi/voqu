import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { INITIAL_LESSONS } from '@/features/lesson/constants/initialLessons.const';
import DeleteCourseModal from '@/features/courses/components/DeleteCourseModal';
import EditCourseModal from '@/features/courses/components/EditCourseModal';
import { Course } from '@/features/courses/types/course.type';
import LessonCard from '@/features/lesson/components/LessonCard/LessonCard';

type CourseLessonsAreaSectionProps = {
  course: Course;
  onSuccess: (data: Course) => void;
};

function CourseLessonsAreaSection({ course, onSuccess }: CourseLessonsAreaSectionProps) {
  const lessons = INITIAL_LESSONS.grammar;
  const [open, setOpen] = useState<'edit' | 'delete' | null>(null);
  const handleClose = () => setOpen(null);

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.title}>
        <Typography>Course Lessons</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography>Drag to reorder lessons</Typography>
      </Box>

      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}

      <Box sx={sxStyles.controls}>
        <Button sx={sxStyles.btn} variant="contained" onClick={() => setOpen('edit')}>
          <EditOutlinedIcon />
          Edit Course
        </Button>
        <EditCourseModal
          onSuccess={onSuccess}
          course={course}
          open={open === 'edit'}
          handleClose={handleClose}
        />
        <Button
          sx={sxStyles.btn}
          variant="outlined"
          color="error"
          onClick={() => setOpen('delete')}
        >
          Delete Course
        </Button>
        <DeleteCourseModal
          courseName={course.name}
          open={open === 'delete'}
          handleClose={handleClose}
        />
      </Box>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    mt: 3,
  },
  title: {
    display: 'flex',
    backgroundColor: 'adminPrimary.main',
    color: 'white',
    p: 3,
    flexDirection: 'row',
    borderRadius: '15px 15px 0 0',
  },
  controls: {
    display: 'flex',
    gap: 2,
    mt: 3,
    justifyContent: 'center',
  },
  btn: {
    height: 50,
  },
});

export default CourseLessonsAreaSection;
