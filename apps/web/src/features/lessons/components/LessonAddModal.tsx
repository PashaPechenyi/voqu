import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LessonFormValues } from '../types/lessonForm.type';
import LessonForm from './LessonForm';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LessonAddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: LessonFormValues) => void;
};

const DEFAULT_VALUES: LessonFormValues = {
  title: '',
  subtitle: '',
  description: '',
  status: '',
};

const LessonAddModal: FC<LessonAddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<LessonFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <Dialog open={isOpen} onClose={onClose} slotProps={{ paper: { sx: sxStyles.paper } }}>
      <DialogTitle>
        <Typography variant="h4">Add Lesson</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Create a new lesson. You can change it after adding.</DialogContentText>
        <LessonForm control={control} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={sxStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit((values) => {
            onSubmit?.(values);
            reset();
          })}
          sx={sxStyles.submitButton}
        >
          Add lesson
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

export default LessonAddModal;
