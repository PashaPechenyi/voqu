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

type LessonAddModalProps = {
  isOpen: boolean;
  close: () => void;
  lesson?: Lesson;
  onclick?: (inputsValues: LessonFormValues) => void;
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

export default function LessonAddModal({ isOpen, close, lesson }: LessonAddModalProps) {
  const { handleSubmit, control } = useForm<LessonFormValues>({
    defaultValues: lesson && getDefaultValues(lesson),
  });

  return (
    <Dialog
      open={isOpen}
      onClose={close}
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
        <Typography variant="h4">Add Lesson</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {' Create a new lesson. You can change lessons after adding lesson'}
        </DialogContentText>
        <LessonModalForm control={control} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button
          //onClick={handleSubmit()}
          sx={{ backgroundColor: '#71677D', color: 'white', p: '10px' }}
        >
          {'Add lesson'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
