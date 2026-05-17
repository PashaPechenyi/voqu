// TODO: `deleteCourseById` uses `method: 'GET'` to perform a DELETE — that is a bug. The DELETE endpoint must be called with `method: 'DELETE'`.
// TODO: `Modal` is imported but never used. Remove the unused import.
// TODO: `useParams()` is consumed here, but the modal also receives `courseName`. Either also accept `courseId` as a prop OR move the delete call into a `useDeleteCourse` hook driven by props — the current mix (URL from router + name from props) is fragile because the modal can be opened in contexts where `courseId` is undefined.
// TODO: `try { ... } catch (error) {}` — swallowed error. At minimum surface it to the user (snackbar/toast); silent failures hide bugs.
// TODO: After a successful delete there's no callback (`onSuccess`) to remove the row from the list / navigate away.
// TODO: Inline `fetch` should move to `features/courses/helpers/deleteCourse.ts` (which exists but is currently an empty stub!).
// TODO: `console.log(result, 'result')` — remove debug logging.
// TODO: Buttons use `onClick={() => onSubmit()}` instead of `onClick={onSubmit}`.
// TODO: `export const` here while the rest of the modals use `export default function`. Pick one export style.
// TODO: `Dialog open={open}` is missing `onClose={handleClose}` — so clicking the backdrop or pressing Esc doesn't close the modal.
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Dialog, Modal, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

type DeleteCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  courseName?: string;
};

export const DeleteCourseModal = ({ open, handleClose, courseName }: DeleteCourseModalProps) => {
  const { courseId } = useParams();
  const deleteCourseById = async () => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const result = await response.json();
      console.log(result, 'result');
      return result;
    } catch (error) {}
  };

  const onSubmit = () => {
    deleteCourseById();
  };
  return (
    <Dialog open={open}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h6" component="h2">
          Delete Course
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{courseName}"? This action cannot be undone.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="error" onClick={() => onSubmit()}>
            Delete
          </Button>
          <Button variant="outlined" onClick={() => handleClose()}>
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
    borderColor: 'red',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
});
