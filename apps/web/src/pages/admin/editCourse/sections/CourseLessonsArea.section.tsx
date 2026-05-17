// TODO: Hardcodes `initialLessons.grammar` regardless of which course is selected — bug. Should be fetched per courseId via a `useGetLessons(courseId)` hook.
// TODO: Title says "Drag to reorder lessons" but no drag-and-drop is implemented. Either remove the hint or wire DnD (e.g. `@dnd-kit/sortable`).
// TODO: `{lessons.map((item) => { return <LessonCardSection data={item} />; })}` — no `key` prop on the rendered card. Add `key={item.id}`.
// TODO: `sxStyles.root as any` and `sxStyles.title as any` — `as any` is forbidden.
// TODO: `Box from '@mui/system'` — use `@mui/material`.
// TODO: Relative imports `'../../../../features/lesson/...'` reach across 4 levels — switch to the `@/features/lesson/...` alias which the rest of the file already uses for sibling imports.
// TODO: The "Edit Course" button is in the lessons area (semantically weird) AND uses the `<AddIcon />` icon for an Edit action — replace with an `<EditIcon />`.
// TODO: `handleCloseDelete` and `handleCloseEdit` are two identical no-op closures returning `setOpen(null)` — replace both with `() => setOpen(null)`.
// TODO: `course?.name` — `course` is required (not optional) per the props type. Drop the `?`.
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { initialLessons } from '../../../../features/lesson/consts/lessons';
import AddIcon from '@mui/icons-material/Add';
import { DeleteCourseModal } from '../../../../features/courses/components/DeleteCourseModal';
import { LessonCardSection } from './LessonCard.section';
import { Course } from '../../adminCourses/types/course.type';
import EditCourseModal from '@/features/courses/components/EditCourseModal';

type CourseLessonsAreaSectionProps = {
  course: Course;
  onSuccess: (data: Course) => void;
};

export const CourseLessonsAreaSection = ({ course, onSuccess }: CourseLessonsAreaSectionProps) => {
  const lessons = initialLessons.grammar;
  const [open, setOpen] = useState<'edit' | 'delete' | null>(null);
  const handleCloseDelete = () => setOpen(null);
  const handleCloseEdit = () => setOpen(null);

  return (
    <Box sx={sxStyles.root as any}>
      <Box sx={sxStyles.title as any}>
        <Typography>Course Lessons</Typography>
        <Box sx={{ flex: 1 }}></Box>
        <Typography>Drag to reorder lessons</Typography>
      </Box>

      {lessons.map((item) => {
        return <LessonCardSection data={item} />;
      })}

      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
        <Button sx={sxStyles.btn} variant="contained" onClick={() => setOpen('edit')}>
          <AddIcon />
          Edit Course
        </Button>
        <EditCourseModal
          onSuccess={onSuccess}
          course={course}
          open={open === 'edit'}
          handleClose={handleCloseEdit}
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
          courseName={course?.name}
          open={open === 'delete'}
          handleClose={handleCloseDelete}
        />
      </Box>
    </Box>
  );
};

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

  btn: {
    height: 50,
  },
});
