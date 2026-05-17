// TODO: Belongs in `features/lesson/components/AddNewLessonModal.tsx`, not `features/courseLevel/`. The thing being added is a lesson, not a course level.
// TODO: Imports `createSxStylesList` from `@/theme/helpers` — use the canonical `@/shared/helpers/styles/createSxStylesList.helper` path used by 90% of the codebase.
// TODO: `sxStyles.modal as any` / `sxStyles.form as any` / `sxStyles.selectBox as any` — `as any` is forbidden. Fix the sx typing.
// TODO: Local `useState<FormValues>` instead of `react-hook-form`. The rest of the project uses RHF + `<Controller>` (see `CourseForm.tsx`) — use the same pattern here.
// TODO: Submit button label is `close/make` — placeholder text. The button currently only closes the modal and does not POST anywhere — implement the actual `addLesson` call.
// TODO: Modal does not accept a `courseId` / `onSuccess` prop — caller cannot know what to refresh.
// TODO: No required-field validation on `title` and `duration` beyond the HTML `required` flag; on real form mismatch the user sees nothing.
// TODO: `duration` is captured as `string` (`'15 min'`) — should be a `number` in minutes (and a `<TextField type="number">`).
// TODO: `lessonType: 'reading'` is hardcoded as default. Use the enum value: `ExerciseTypeKey.reading`.
// TODO: `export const` here while sibling modals use `export default function`. Pick one.
import { createSxStylesList } from '@/theme/helpers';
import { Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { ExerciseTypeKey } from '../types/exerciseTypeKey.type';

type FormValues = {
  title: string;
  duration: string;
  lessonType: string;
};
const lessonType = Object.values(ExerciseTypeKey);
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
