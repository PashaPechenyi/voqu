// TODO: `courseDetails: Course | null` is overly defensive — the parent page does an early `if (!courseDetails) return ...` before rendering this section, so by the time it renders, `courseDetails` is never null. Drop the null.
// TODO: Relative import `'../../../../features/courseLevel/components/AddNewLessonModal'` — use the `@/features/...` alias used elsewhere in the project.
// TODO: `AddNewLessonModal` belongs in `features/lesson/components/`, not `features/courseLevel/` (see TODO in that file).
// TODO: `<Box sx={{ flex: 1 }}>` spacer — replace with `flexGrow={1}` on a neighbor or `justifyContent="space-between"` on the row to avoid the empty `<Box>`.
// TODO: `onClick={() => handleOpen()}` — pass the function reference directly.
// TODO: `AddNewLessonModal` is unused outside of this section; consider moving it to be page-local if it remains coupled to this page (or wire it as a feature component if reused).
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { AddNewLessonModal } from '../../../../features/courseLevel/components/AddNewLessonModal';
import { Course } from '../../adminCourses/types/course.type';
type EditCourseHeaderSectionProps = {
  courseDetails: Course | null;
};
export const EditCourseHeaderSection = ({ courseDetails }: EditCourseHeaderSectionProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h3">{courseDetails?.name}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}></Box>
      <Button sx={sxStyles.btn} variant="contained" onClick={() => handleOpen()}>
        <AddIcon />
        Add lesson
      </Button>
      <AddNewLessonModal open={open} handleClose={handleClose} />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    height: 50,
  },
});
