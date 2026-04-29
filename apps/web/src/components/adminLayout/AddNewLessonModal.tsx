import { createSxStylesList } from '@/theme/helpers';
import { Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

type FormValues = {
  title: string;
  duration: string;
  lessonType: string;
};
const lessonType: string[] = ['reading', 'listening', 'grammar', 'quiz'];
type AddNewLessonModalProps = {
  open: boolean;
  handleClose: () => void;
};

export const AddNewLessonModal = ({ open, handleClose }: AddNewLessonModalProps) => {
  const [form, setForm] = useState<FormValues>({
    title: '',
    duration: '',
    lessonType: 'reading',
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sxStyles.modal as any}>
          <Typography id="modal-modal-title" variant="h3">
            Add New Lesson
          </Typography>
          <Typography color={'primary'} id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Create a new lesson for this course.
          </Typography>
          <Box sx={sxStyles.form as any}>
            <TextField
              sx={sxStyles.textField}
              color="primary"
              required
              variant="filled"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <TextField
              sx={sxStyles.textField}
              required
              variant="filled"
              multiline
              placeholder="Duration"
              value={form.duration}
              onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
            />
            <Box sx={sxStyles.selectBox as any}>
              <TextField
                sx={sxStyles.select}
                variant="filled"
                select
                focused
                label="Select"
                defaultValue="A1"
                value={form.lessonType}
                onChange={(e) => setForm((prev) => ({ ...prev, lessonType: e.target.value }))}
              >
                {lessonType.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Button variant="contained" onClick={() => handleClose()}>
            close/make
          </Button>
        </Box>
      </Modal>
    </>
  );
};
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
