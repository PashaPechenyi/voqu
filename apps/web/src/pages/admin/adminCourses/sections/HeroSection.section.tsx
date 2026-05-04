import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import ModalAddNewForm from '../../../../features/AddNewModal/ModalAddNewForm';
import AddIcon from '@mui/icons-material/Add';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

export default function HeroSection() {
  //   const isOpen = true;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h2">Manage Courses</Typography>
        <Typography variant="h6" color={'primary'}>
          Create, edit, and organize your course library
        </Typography>
      </Box>
      <Button sx={sxStyles.btn} variant="contained" onClick={() => handleOpen()}>
        <AddIcon />
        Add New Course
      </Button>
      <ModalAddNewForm open={open} handleClose={handleClose} />
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
