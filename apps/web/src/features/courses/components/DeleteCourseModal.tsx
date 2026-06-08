import { Box, Button, Dialog, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useDeleteCourse } from '../hooks/useDeleteCourse';

type DeleteCourseModalProps = {
  open: boolean;
  onClose: () => void; // RENAME: handleClose -> onClose - event-emitting prop must start with 'on'
  courseName?: string;
  onDeleteSuccess?: () => void; // RENAME: onDeleted -> onDeleteSuccess - present-tense on<Verb>Success
};

function DeleteCourseModal({ open, onClose, courseName, onDeleteSuccess }: DeleteCourseModalProps) {
  const { courseId } = useParams();
  const { deleteCourse, isLoading } = useDeleteCourse({ onSuccess: onDeleteSuccess });

  const onSubmit = () => {
    if (!courseId) return;
    deleteCourse(courseId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h6" component="h2">
          Delete Course
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{courseName}"? This action cannot be undone.
        </Typography>

        <Box sx={sxStyles.actions}>
          <Button loading={isLoading} variant="contained" color="error" onClick={onSubmit}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
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
