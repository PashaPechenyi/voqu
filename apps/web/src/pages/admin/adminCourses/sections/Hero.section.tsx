import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import AddCourseModal from '@/features/courses/components/AddCourseModal';
type HeroSectionProps = {
  refetchCourses: () => void;
};
function HeroSection({ refetchCourses }: HeroSectionProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onCreated = () => {
    refetchCourses();
    handleClose();
  };
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h2">Manage Courses</Typography>
        <Typography variant="h6" color="primary">
          Create, edit, and organize your course library
        </Typography>
      </Box>
      <Button sx={sxStyles.btn} variant="contained" onClick={handleOpen}>
        <AddIcon />
        Add New Course
      </Button>
      <AddCourseModal open={open} handleClose={handleClose} onCreated={onCreated} />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  },
  btn: {
    height: 50,
  },
});

export default HeroSection;
