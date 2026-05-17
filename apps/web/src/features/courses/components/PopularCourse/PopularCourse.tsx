// TODO: Props `{ name, students, completion }` duplicate the `PopularCourses` type — accept `data: PopularCourse` (renamed singular type) instead of spreading individual fields.
// TODO: `sxStyles.card` is declared but never used in this component. Dead style — remove.
// TODO: Using `<Slider disabled slots={{ thumb: 'noindex' }}>` to render a progress bar is a misuse — use `<LinearProgress variant="determinate" value={completion} />` from MUI.
// TODO: Folder convention: this component lives in its own folder `PopularCourse/PopularCourse.tsx`, but most other feature components are flat files (`AddCourseModal.tsx`). Standardize on either always-folder or always-file naming.
import { Box, Slider, Typography } from '@mui/material';

import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type PopularCourseProps = {
  name: string;
  students: number;
  completion: number;
};

function PopularCourse({ name, students, completion }: PopularCourseProps) {
  return (
    <Box sx={sxStyles.recentItem}>
      <Typography variant="body1">{name}</Typography>
      <Typography color={'primary'} variant="body2">
        {students} students enrolled
      </Typography>
      <Typography color={'primary'} sx={sxStyles.typography}>
        <Slider slots={{ thumb: 'noindex' }} disabled defaultValue={completion} />
        {completion}%
      </Typography>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  card: {
    width: '50%',
    border: '2px solid',
    borderColor: 'adminSecondary.main',
  },
  typography: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    gap: 1,
  },
  recentItem: {
    p: 1,
  },
});

export default PopularCourse;
