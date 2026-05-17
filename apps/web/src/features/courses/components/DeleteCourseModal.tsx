import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Dialog, Modal, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

type DeleteCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  courseName?: string;
};

export const DeleteCourseModal = ({ open, handleClose, courseName }: DeleteCourseModalProps) => {
  const { courseId } = useParams();
  const deleteCourseById = async () => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const result = await response.json();
      console.log(result, 'result');
      return result;
    } catch (error) {}
  };

  const onSubmit = () => {
    deleteCourseById();
  };
  return (
    <Dialog open={open}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h6" component="h2">
          Delete Course
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{courseName}"? This action cannot be undone.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="error" onClick={() => onSubmit()}>
            Delete
          </Button>
          <Button variant="outlined" onClick={() => handleClose()}>
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
const sxStyles = createSxStylesList({
  modal: {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'red',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
});
