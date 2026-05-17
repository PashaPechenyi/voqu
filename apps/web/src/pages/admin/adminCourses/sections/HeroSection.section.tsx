// TODO: File is `HeroSection.section.tsx` but the component is named just `HeroSection`. With the `.section.tsx` suffix the convention is `<Name>.section.tsx`. Either rename file to `Hero.section.tsx` or rename component to `HeroSectionSection` (don't). Pattern: `Hero.section.tsx` exporting `HeroSection`.
// TODO: `onClick={() => handleOpen()}` — pass the function reference directly.
// TODO: `AddCourseModal` does not accept an `onSuccess` prop (yet). When that's added, wire it here to call `addCoursesToTheList` from `useGetCourses`, so the new course shows up immediately.
// TODO: This is a thin wrapper around two `Typography` + one `Button`. Probably doesn't need its own section file — could be inlined in `AdminCoursesLayout` (the page).
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import AddCourseModal from '@/features/courses/components/AddCourseModal';

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <Typography variant="h2">Manage Courses</Typography>
        <Typography variant="h6" color={'primary'}>
          Create, edit, and organize your course library
        </Typography>
      </Box>
      <Button sx={sxStyles.btn} variant="contained" onClick={() => handleOpen()}>
        <AddIcon />
        Add New Course
      </Button>
      <AddCourseModal open={open} handleClose={handleClose} />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  },
  btn: {
    height: 50,
  },
});
