import { Box, Button, Dialog, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import deleteCourse from '../helpers/deleteCourse';

type DeleteCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  courseName?: string;
};

function DeleteCourseModal({ open, handleClose, courseName }: DeleteCourseModalProps) {
  const { courseId } = useParams();

  const onSubmit = async () => {
    if (!courseId) return;
    try {
      await deleteCourse(courseId);
    } catch (error) {
      // Surface the error via UI once an error-toaster is in place.
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h6" component="h2">
          Delete Course
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{courseName}"? This action cannot be undone.
        </Typography>

        <Box sx={sxStyles.actions}>
          <Button variant="contained" color="error" onClick={onSubmit}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

const sxStyles = createSxStylesList({
  modal: {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'error.main',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
  },
});

export default DeleteCourseModal;
