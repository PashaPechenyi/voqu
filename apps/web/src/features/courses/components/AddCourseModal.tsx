// TODO: The component does the `fetch('/api/course', ...)` call inline. Move all data-mutation code to a `useAddCourse` hook under `features/courses/hooks/`, mirroring `useEditCourse`. Component must not touch `fetch` directly (it cannot be tested or reused).
// TODO: `console.log(result)` left in production code — remove.
// TODO: `useEffect(() => { fetchLevels(); }, [])` has an empty dep array but ESLint react-hooks/exhaustive-deps will warn — `fetchLevels` is not memoized in `useGetLevelsList`. Memoize it with `useCallback` or accept the lint warning intentionally.
// TODO: `addCourse` doesn't `await` the modal close, doesn't show an error toast, doesn't disable the submit button while loading, and doesn't call `handleClose`/refresh the courses list on success. The flow is incomplete.
// TODO: No `onSuccess` prop — after creating, the parent has no way to refresh its list. Add `onSuccess: (course: Course) => void` like `EditCourseModal` already does.
// TODO: `<>...</>` wrapping a single `<Dialog>` — remove the fragment.
// TODO: This file uses `export default function AddCourseModal` (one style) while other files use `function Foo() {} export default Foo;`. Pick one style.
// TODO: `bgcolor: 'background.paper', border: '2px solid #000'` — black border is jarring; use `theme.palette.divider`.
import useGetLevelsList from '@/features/levels/hooks/useGetLevelsList';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CourseForm from './CourseForm';
import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseStatusKey } from '../types/courseStatus.type';
import { convertCourseFormDataToAPIFormat } from '../helpers/convertCourseFormDataToAPIFormat';

type AddCourseModalProps = {
  open: boolean;
  handleClose: () => void;
};
const statusesList = Object.values(CourseStatusKey);
export default function AddCourseModal({ open, handleClose }: AddCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsData, fetchLevels } = useGetLevelsList();

  const onSubmit = (data: CourseFormValues) => {
    addCourse(data);
  };

  const addCourse = async (data: CourseFormValues) => {
    const response = await fetch('/api/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertCourseFormDataToAPIFormat(data)),
    });

    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={sxStyles.modal}>
          <Typography variant="h3">Add New Course</Typography>
          <Typography color={'primary'} id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Create a new course. You can add lessons after creating the course.
          </Typography>

          <CourseForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            levelsOptions={levelsData}
            statusesOptions={statusesList}
          />
        </Box>
      </Dialog>
    </>
  );
}

const sxStyles = createSxStylesList({
  modal: {
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
});
