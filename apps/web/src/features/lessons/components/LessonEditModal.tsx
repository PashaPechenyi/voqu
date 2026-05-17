import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Lesson } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';
import LessonModalForm from './LessonModalForm';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LessonEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  onSubmit: (values: LessonFormValues) => void;
};

const getDefaultValues = (lesson: Lesson): LessonFormValues => ({
  title: lesson.title,
  type: lesson.type,
});

const LessonEditModal: FC<LessonEditModalProps> = ({ isOpen, onClose, lesson, onSubmit }) => {
  const { handleSubmit, control } = useForm<LessonFormValues>({
    defaultValues: getDefaultValues(lesson),
  });

  return (
    <Dialog open={isOpen} onClose={onClose} slotProps={{ paper: { sx: sxStyles.paper } }}>
      <DialogTitle>
        <Typography variant="h4">Edit Lesson</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Edit a lesson</DialogContentText>
        <LessonModalForm control={control} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={sxStyles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} sx={sxStyles.submitButton}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const sxStyles = createSxStylesList({
  paper: (theme) => ({
    p: '20px',
    borderRadius: '20px',
    border: `3px solid ${theme.palette.divider}`,
    width: 1,
  }),
  cancelButton: { p: '10px' },
  submitButton: (theme) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    p: '10px',
  }),
});

export default LessonEditModal;
