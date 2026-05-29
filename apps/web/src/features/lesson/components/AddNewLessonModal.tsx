import { Box, Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h3">Add New Lesson</Typography>

        <Typography color="primary" sx={{ mt: 2, mb: 4 }}>
          Create a new lesson for this course.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              color="primary"
              required
              variant="filled"
              placeholder="Title"
              value={formValues.title}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              required
              variant="filled"
              placeholder="Duration"
              value={formValues.duration}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  duration: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
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
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2,
                flexWrap: 'wrap',
              }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>

              <Button variant="contained">Create Lesson</Button>
            </Box>
          </Grid>
        </Grid>
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
  // form: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   gap: 2,
  //   mb: 2,
  // },
  // textField: {
  //   width: '100%',
  // },
  // selectBox: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   gap: 2,
  //   flex: 1,
  // },
  // select: {
  //   width: '50%',
  // },
});

export default AddNewLessonModal;
