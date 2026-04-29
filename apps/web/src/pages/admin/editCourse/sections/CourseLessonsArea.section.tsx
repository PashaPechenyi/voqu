import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { initialLessons, lessonTypeColors, lessonTypeIcons } from '../consts/lessons';
import AddIcon from '@mui/icons-material/Add';
import ModalAddNewForm from '@/shared/components/AddNewCourseModal/ModalAddNewForm';
import { Course } from '@/features/courses/types/course.type';
import { DeleteCourseModal } from '../../../../components/adminLayout/DeleteCourseModal';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
        const LessType = item.type;
        const LessonIcon = lessonTypeIcons[LessType];
        const IconColor = lessonTypeColors[LessType];
        return (
          <Card sx={sxStyles.card} key={item.id}>
            <CardContent sx={sxStyles.cardContent}>
              <Chip label={item.id} color="primary" />
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: IconColor,
                  borderRadius: '50px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: IconColor + 20,
                }}
              >
                <LessonIcon fontSize="small" htmlColor={IconColor} />
              </Box>

              <Box>
                <Typography>{item.title}</Typography>
                <Box sx={sxStyles.lessonInfo as any}>
                  <Typography variant="body2">{item.duration} min</Typography>
                  <Chip label={item.type} color="primary" variant="outlined" size="small" />
                </Box>
              </Box>
            </CardContent>
            <Box sx={{ flex: 1 }}></Box>
            <CardActions>
              <IconButton aria-label="lock">
                <LockOutlinedIcon />
              </IconButton>
              <IconButton color="warning" aria-label="edit">
                <EditOutlinedIcon />
              </IconButton>
              <IconButton color="error" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
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
  card: {
    display: 'flex',
    borderRadius: 0,
    flexDirection: 'row',
  },
  btn: {
    height: 50,
  },
  cardContent: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  lessonInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
});
