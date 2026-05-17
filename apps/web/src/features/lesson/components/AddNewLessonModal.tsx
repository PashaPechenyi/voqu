import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonSegmentType } from '../types/lessonSegmentType.type';

type FormValues = {
  title: string;
  duration: string;
  segmentType: LessonSegmentType;
};

const LESSON_SEGMENT_TYPES = Object.values(LessonSegmentType);

type AddNewLessonModalProps = {
  open: boolean;
  handleClose: () => void;
};

function AddNewLessonModal({ open, handleClose }: AddNewLessonModalProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    duration: '',
    segmentType: LessonSegmentType.reading,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={sxStyles.modal}>
        <Typography id="modal-modal-title" variant="h3">
          Add New Lesson
        </Typography>
        <Typography color="primary" id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Create a new lesson for this course.
        </Typography>
        <Box sx={sxStyles.form}>
          <TextField
            sx={sxStyles.textField}
            color="primary"
            required
            variant="filled"
            placeholder="Title"
            value={formValues.title}
            onChange={(e) => setFormValues((prev) => ({ ...prev, title: e.target.value }))}
          />
          <TextField
            sx={sxStyles.textField}
            required
            variant="filled"
            multiline
            placeholder="Duration"
            value={formValues.duration}
            onChange={(e) => setFormValues((prev) => ({ ...prev, duration: e.target.value }))}
          />
          <Box sx={sxStyles.selectBox}>
            <TextField
              sx={sxStyles.select}
              variant="filled"
              select
              focused
              value={formValues.segmentType}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  segmentType: e.target.value as LessonSegmentType,
                }))
              }
            >
              {LESSON_SEGMENT_TYPES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
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
    border: '2px solid',
    borderColor: 'divider',
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

export default AddNewLessonModal;
