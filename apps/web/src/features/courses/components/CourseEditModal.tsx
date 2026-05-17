import { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Course } from '../types/course.type';
import CourseModalForm from './CourseModalForm';
import { useLevelsList } from '@/features/levels/hooks/useLevelsList';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { CourseFormValues } from '../types/courseForm.type';

type CourseEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  course?: Course;
  onEdit: (values: CourseFormValues) => void;
};

const getDefaultValues = (course?: Course): CourseFormValues => ({
  name: course?.name ?? '',
  level: course?.level ?? null,
  status: course?.status ?? null,
});

const CourseEditModal: FC<CourseEditModalProps> = ({ isOpen, onClose, course, onEdit }) => {
  const { fetchLevels, levelsList } = useLevelsList();

  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: getDefaultValues(course),
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
        <Typography variant="h4">Edit Course</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Update course information and settings</DialogContentText>
        <CourseModalForm control={control} levelsList={levelsList} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={sxStyles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onEdit)} sx={sxStyles.submitButton}>
          Edit
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

export default CourseEditModal;
