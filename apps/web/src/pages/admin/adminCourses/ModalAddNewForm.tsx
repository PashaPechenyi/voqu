import { courseLevels } from '@/features/courseLevel/constants/courseLevels.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';

type ModalAddNewFormProps = {
  open: boolean;
  handleClose: () => void;
};
const status = ['Draft', 'Published'];

export default function ModalAddNewForm({ open, handleClose }: ModalAddNewFormProps) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sxStyles.modal}>
          <Typography id="modal-modal-title" variant="h3">
            Add New Course
          </Typography>
          <Typography color={'primary'} id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Create a new course. You can add lessons after creating the course.
          </Typography>
          <Box sx={sxStyles.form}>
            <TextField
              sx={sxStyles.textField}
              color="primary"
              required
              variant="filled"
              placeholder="Title"
            />
            <TextField
              sx={sxStyles.textField}
              required
              variant="filled"
              multiline
              placeholder="Description"
            />
            <Box sx={sxStyles.selectBox}>
              <TextField
                sx={sxStyles.select}
                variant="filled"
                select
                focused
                label="Select"
                defaultValue="A1"
              >
                {courseLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                sx={sxStyles.select}
                variant="filled"
                select
                focused
                label="Status"
                defaultValue="draft"
              >
                {status.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <TextField sx={sxStyles.textField} variant="filled" placeholder="Image URL" />
          </Box>
          <Button variant="contained" onClick={() => handleClose()}>
            close/make
          </Button>
        </Box>
      </Modal>
    </>
  );
}

const sxStyles = createSxStylesList({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mb: 2,
  },
  textField: {
    width: '100%',
  },
  selectBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    flex: 1,
  },
  select: {
    width: '50%',
  },
});
