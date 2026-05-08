import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { LessonTypeKey } from '../constants/lessonType.constant';
import { Lesson } from '../types/lesson.types';
import LessonModalForm from './LessonModalForm';
import { useForm } from 'react-hook-form';

//const LESSON_TYPES = ['grammar', 'reading', 'speaking', 'listening', 'quiz', 'test'];

type LessonEditModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lesson: Lesson;
  onclick: (inputsValues: LessonFormValues) => void;
};
export type LessonFormValues = {
  title: string;
  type: LessonTypeKey | null;
};
function getDefaultValues(value: LessonFormValues) {
  return {
    title: value.title || '',
    type: null,
  };
}

export default function LessonEditModal({ isOpen, setIsOpen, lesson }: LessonEditModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };
  const { handleSubmit, control } = useForm<LessonFormValues>({
    defaultValues: lesson && getDefaultValues(lesson),
  });

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            p: '20px',
            borderRadius: '20px',
            border: '3px solid grey',
            width: 1,
          },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4">Edit Lesson</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{' Edit a  lesson'}</DialogContentText>
        <LessonModalForm control={control} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button
          //onClick={handleSubmit(onclick)}
          sx={{ backgroundColor: '#71677D', color: 'white', p: '10px' }}
        >
          {' Save changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
