import { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import CourseModalForm from './CourseModalForm';
import { useLevelsList } from '@/features/levels/hooks/useLevelsList';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { CourseFormValues } from '../types/courseForm.type';

type CourseAddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CourseFormValues) => void;
};

const DEFAULT_VALUES: CourseFormValues = {
  name: '',
  level: null,
  status: null,
  description: '',
};

const CourseAddModal: FC<CourseAddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { fetchLevels, levelsList } = useLevelsList();
  const { handleSubmit, control, reset } = useForm<CourseFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  // TODO: fetch once on mount; fetchLevels' identity depends on onSuccess/onError,
  // so listing it as a dep would refire the request whenever those callbacks change.
  useEffect(() => {
    fetchLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={isOpen} onClose={onClose} slotProps={{ paper: { sx: sxStyles.paper } }}>
      <DialogTitle>
        <Typography variant="h4">Add Course</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new course. You can add lessons after creating it.
        </DialogContentText>
        <CourseModalForm control={control} levelsList={levelsList} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            reset();
          }}
          sx={sxStyles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit((values) => {
            onSubmit(values);
            reset();
          })}
          sx={sxStyles.submitButton}
        >
          Add course
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

export default CourseAddModal;
