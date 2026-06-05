import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import DeleteCourseModal from '@/features/courses/components/DeleteCourseModal';
import EditCourseModal from '@/features/courses/components/EditCourseModal';
import { Course } from '@/features/courses/types/course.type';
import LessonCard from '@/features/lesson/components/LessonCard/LessonItem';
import { useNavigate } from 'react-router-dom';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { useReorderLesson } from '@/features/lesson/hooks/useReorderLessons';

type CourseLessonsAreaSectionProps = {
  lessonsList: LessonListItem[];
  course: Course;
  onSuccess: (course: Course) => void;
  setLessonsList: React.Dispatch<React.SetStateAction<LessonListItem[]>>;
  refetchLessons: (courseId: Course['id']) => void;
};

function CourseLessonsAreaSection({
  course,
  onSuccess,
  lessonsList,
  setLessonsList,
  refetchLessons,
}: CourseLessonsAreaSectionProps) {
  const [open, setOpen] = useState<'edit' | 'delete' | null>(null);

  const { reorderLessons } = useReorderLesson();

  const navigate = useNavigate();
  const handleClose = () => setOpen(null);
  const handleDeleted = () => {
    handleClose();
    navigate(ADMIN_COURSES_URL);
  };

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.title}>
        <Typography>Course Lessons</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography>Drag to reorder lessons</Typography>
      </Box>
      <DragDropProvider
        onDragEnd={(event) => {
          const orderedList = move(lessonsList, event);
          setLessonsList(orderedList);
          reorderLessons(orderedList, course);
        }}
      >
        {lessonsList.map((lesson, index) => {
          return (
            <LessonCard
              courseId={course.id}
              refetchLessons={refetchLessons}
              key={lesson.id}
              lessonId={lesson.id}
              lessonIndex={index}
              lesson={lesson}
            />
          );
        })}
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
