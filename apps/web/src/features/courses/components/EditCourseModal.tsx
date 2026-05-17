// TODO: Imports `Course` from `@/pages/admin/adminCourses/types/course.type` — but this is a feature-level modal. The feature folder should own the `Course` type (see TODO in `features/courses/types/course.type.ts`). Right now you have two conflicting `Course` shapes.
// TODO: The local re-declaration of `enum CourseStatusKey` shadows the one already exported from `../types/courseStatus.type`. Delete the local enum and import the real one.
// TODO: `defaultValues` populates only `title: course.name` and leaves description/level/status/image empty. After opening "Edit" on a course, the user sees blank fields and silently overwrites the real description on submit. Pre-fill all fields from `course`.
// TODO: `<>...</>` wrapping a single `<Dialog>` — remove.
// TODO: `useEffect(() => { fetchLevels(); }, [])` — same exhaustive-deps caveat as in `AddCourseModal`.
// TODO: Modal closes on click-outside (`onClose={handleClose}`) but no "are you sure / discard unsaved changes" guard. Combined with the prefill bug above this can clobber data.
// TODO: This file is ~95% identical to `AddCourseModal.tsx`. Build a single `<CourseFormModal mode="add" | "edit">` to remove the duplication.
import useGetLevelsList from '@/features/levels/hooks/useGetLevelsList';
import { Course } from '@/pages/admin/adminCourses/types/course.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Dialog, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CourseForm from './CourseForm';
import { CourseFormValues } from '../types/courseFormValues.type';
import useEditCourse from '../hooks/useEditCourse';

type EditCourseModalProps = {
  open: boolean;
  handleClose: () => void;
  course: Course;
  onSuccess: (data: Course) => void;
};
enum CourseStatusKey {
  'Draft' = 'draft',
  'Published' = 'published',
}
const statusesList = Object.values(CourseStatusKey);

export default function EditCourseModal({
  open,
  handleClose,
  course,
  onSuccess,
}: EditCourseModalProps) {
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues: {
      title: course.name,
      description: '',
      level: null,
      status: null,
      image: '',
    },
  });
  const { levelsData, fetchLevels } = useGetLevelsList();
  const { updateCourseById } = useEditCourse({ onSuccess });

  const onSubmit = (data: CourseFormValues) => {
    updateCourseById(course.id, data);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={sxStyles.modal}>
          <Typography variant="h3">Edit Course</Typography>
          <Typography color={'primary'} sx={{ mt: 2, mb: 2 }}>
            Edit Course. you can edit lessons later
          </Typography>

          <CourseForm
            edit
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
