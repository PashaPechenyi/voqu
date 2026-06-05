import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { useDeleteLesson } from '../../hooks/useDeleteLesson';
import { LessonListItem } from '../../types/lessonListItem.type';

type DeleteLessonModalProps = {
  open: boolean;
  handleClose: () => void;
  lesson: LessonListItem;
  onDeleted?: () => void;
};
export const DeleteLessonModal = ({
  open,
  handleClose,
  lesson,
  onDeleted,
}: DeleteLessonModalProps) => {
  const { deleteLesson, isLoading } = useDeleteLesson({ onSuccess: onDeleted });
  const onSubmit = () => {
    if (!lesson.id) return;
    deleteLesson(lesson.id);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h6" component="h2">
          Delete Lesson
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{lesson.title}"? This action cannot be undone.
        </Typography>

        <Box sx={sxStyles.actions}>
          <Button loading={isLoading} onClick={() => onSubmit()} variant="contained" color="error">
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
const sxStyles = createSxStylesList({
  modal: {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'error.main',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
  },
});
