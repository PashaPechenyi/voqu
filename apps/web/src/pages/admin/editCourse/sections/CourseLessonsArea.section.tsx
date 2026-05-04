import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { initialLessons } from '../../../../features/lesson/consts/lessons';
import AddIcon from '@mui/icons-material/Add';
import ModalAddNewForm from '@/features/AddNewModal/ModalAddNewForm';
import { Course } from '@/features/courses/types/course.type';
import { DeleteCourseModal } from '../../../../features/courses/components/PopularCourse/modals/DeleteCourseModal';
import { LessonCardSection } from './LessonCard.section';

type CourseLessonsAreaSectionProps = {
  course?: Course;
};

export const CourseLessonsAreaSection = ({ course }: CourseLessonsAreaSectionProps) => {
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
        <ModalAddNewForm course={course} open={open === 'edit'} handleClose={handleCloseEdit} />
        <Button
          sx={sxStyles.btn}
          variant="outlined"
          color="error"
          onClick={() => setOpen('delete')}
        >
          Delete Course
        </Button>
        <DeleteCourseModal
          courseName={course?.title}
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
