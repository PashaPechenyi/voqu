import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Level } from '@/features/levels/types/level.type';
import { CourseStatusKey } from '../constants/courseStatus.const';
import { Course } from '@/pages/admin/Courses/sections/CoursesSection';
import CourseModalForm from './CourseModalForm';
import useFetchLevels from '../customHooks/useFetchLevels';

export type CourseFormValues = {
  name: string;
  //  description?: string;
  levelId: Level | null;
  status: CourseStatusKey | null;
  // link?: string;
};

type CourseEditModalProps = {
  isOpen: boolean;
  close: () => void;
  mainWord?: string;
  course?: Course;
};
function getDefaultValues(value: CourseFormValues) {
  return {
    name: value.name || '',
    // description: value.description || '',
    levelId: null,
    status: null,
    // link: value?.link || '',
  };
}

export default function CourseEditModal({ isOpen, close, course }: CourseEditModalProps) {
  const { getLevelsList, levelsList } = useFetchLevels();

  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: course && getDefaultValues(course),
  });

  useEffect(() => {
    getLevelsList();
  }, []);

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
        <Typography variant="h4">Edit Course</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{'Update course information and settings'}</DialogContentText>

        <CourseModalForm control={control} levelsList={levelsList} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button
          //onClick={handleSubmit(addNewCourse)}
          sx={{ backgroundColor: '#71677D', color: 'white', p: '10px' }}
        >
          {'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
