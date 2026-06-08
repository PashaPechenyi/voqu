import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import DeleteCourseModal from '@/features/courses/components/DeleteCourseModal';
import UpdateCourseModal from '@/features/courses/components/UpdateCourseModal';
import { Course } from '@/features/courses/types/course.type';
import LessonItem from '@/features/lesson/components/LessonItem/LessonItem';
import { useNavigate } from 'react-router-dom';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { useReorderLessons } from '@/features/lesson/hooks/useReorderLessons';

type CourseLessonsAreaSectionProps = {
  lessonsList: LessonListItem[];
  course: Course;
  onUpdateSuccess: (course: Course) => void; // RENAME: onSuccess -> onUpdateSuccess - present-tense on<Verb>Success; 'onSuccess' is hook-only vocabulary
  setLessonsList: React.Dispatch<React.SetStateAction<LessonListItem[]>>;
  reloadLessons: (courseId: Course['id']) => void; // RENAME: refetchLessons -> reloadLessons - no 'fetch' in names; refresh callback uses 'reload'
};

function CourseLessonsAreaSection({
  course,
  onUpdateSuccess,
  lessonsList,
  setLessonsList,
  reloadLessons,
}: CourseLessonsAreaSectionProps) {
  const [open, setOpen] = useState<'update' | 'delete' | null>(null);

  const { reorderLessons } = useReorderLessons();

  const navigate = useNavigate();
  const handleClose = () => setOpen(null);
  // RENAME: handleDeleted -> handleDeleteSuccess - align local handler with the on<Verb>Success it feeds
  const handleDeleteSuccess = () => {
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
        {lessonsList.map((lesson, index) => (
          <LessonItem
            courseId={course.id}
            reloadLessons={reloadLessons}
            key={lesson.id}
            lessonId={lesson.id}
            lessonIndex={index}
            lesson={lesson}
          />
        ))}
      </DragDropProvider>

      <Box sx={sxStyles.controls}>
        <Button sx={sxStyles.btn} variant="contained" onClick={() => setOpen('update')}>
          <EditOutlinedIcon />
          Update Course
        </Button>
        <UpdateCourseModal
          onUpdateSuccess={onUpdateSuccess}
          course={course}
          open={open === 'update'}
          onClose={handleClose}
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
          onDeleteSuccess={handleDeleteSuccess}
          courseName={course.name}
          open={open === 'delete'}
          onClose={handleClose}
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
