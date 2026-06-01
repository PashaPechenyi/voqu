import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { INITIAL_LESSONS } from '@/features/lesson/constants/initialLessons.const';
import DeleteCourseModal from '@/features/courses/components/DeleteCourseModal';
import EditCourseModal from '@/features/courses/components/EditCourseModal';
import { Course } from '@/features/courses/types/course.type';
import LessonCard from '@/features/lesson/components/LessonCard/LessonItem';
import { useNavigate } from 'react-router-dom';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { Lesson } from '@/features/lesson/types/lesson.type';
import { LessonListItem } from '../../../../../../api/src/modules/lesson/structs/lesson-list-item.constructor';

type CourseLessonsAreaSectionProps = {
  lessonsList: LessonListItem[];
  course: Course;
  onSuccess: (course: Course) => void;
};

function CourseLessonsAreaSection({
  course,
  onSuccess,
  lessonsList,
}: CourseLessonsAreaSectionProps) {
  const lessons = INITIAL_LESSONS.grammar;
  const [open, setOpen] = useState<'edit' | 'delete' | null>(null);
  const [items, setItems] = useState(createRange(lessons.length));

  const navigate = useNavigate();
  const handleClose = () => setOpen(null);
  const handleDeleted = () => {
    handleClose();
    navigate(ADMIN_COURSES_URL);
  };
  function createRange(length: number) {
    return Array.from({ length }, (_, i) => i + 1);
  }

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.title}>
        <Typography>Course Lessons</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography>Drag to reorder lessons</Typography>
      </Box>
      <DragDropProvider
        onDragEnd={(event) => {
          setItems((items) => move(items, event));
        }}
      >
        {lessonsList.map((lesson, index) => (
          <LessonCard key={lesson.id} lessonId={lesson.id} lessonIndex={index} lesson={lesson} />
        ))}
      </DragDropProvider>

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
          onDeleted={handleDeleted}
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
