import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Modal, Typography } from '@mui/material';

type DeleteCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  courseName?: string;
};

export const DeleteCourseModal = ({ open, handleClose, courseName }: DeleteCourseModalProps) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={sxStyles.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Course
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{courseName}"? This action cannot be undone.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="error" onClick={() => handleClose()}>
            Delete
          </Button>
          <Button variant="outlined" onClick={() => handleClose()}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
const sxStyles = createSxStylesList({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'red',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
});
