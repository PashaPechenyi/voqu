import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { AddNewLessonModal } from '../../../../features/courseLevel/components/AddNewLessonModal';
import { Course } from '../../adminCourses/types/course.type';
type EditCourseHeaderSectionProps = {
  courseDetails: Course | null;
};
export const EditCourseHeaderSection = ({ courseDetails }: EditCourseHeaderSectionProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h3">{courseDetails?.name}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}></Box>
      <Button sx={sxStyles.btn} variant="contained" onClick={() => handleOpen()}>
        <AddIcon />
        Add lesson
      </Button>
      <AddNewLessonModal open={open} handleClose={handleClose} />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    height: 50,
  },
});
