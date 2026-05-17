// TODO: `useEffect(() => { fetchCourses(); }, [])` — same exhaustive-deps issue as elsewhere. `fetchCourses` should be `useCallback`-stable, or simply moved into the hook itself so consumers don't need an effect.
// TODO: No empty-state / loading-state UI. When `coursesData` is `[]` (loading or no data) the page is blank.
// TODO: No error handling — if `fetchCourses` throws, nothing is shown.
// TODO: After adding a course via `AddCourseModal`, this section won't refresh. Wire `addCoursesToTheList` from `useGetCourses` into `AddCourseModal.onSuccess`.
import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useEffect } from 'react';

import { CourseCardSection } from './CourseCard.section';
import useGetCourses from '@/features/courses/hooks/useGetCourses';

export default function CoursesSection() {
  const { coursesData, fetchCourses } = useGetCourses();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Box sx={sxStyles.root}>
      {coursesData.map((courseData) => (
        <CourseCardSection key={courseData.id} courseData={courseData} />
      ))}
    </Box>
  );
}
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'start',
  },
});
