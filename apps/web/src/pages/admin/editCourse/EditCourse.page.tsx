// TODO: `getCourseDetailsById` is defined inline inside the page component — duplicates the pattern used elsewhere. Move to `features/courses/helpers/getCourseById.ts` and call from a `useGetCourseById(courseId)` hook (`features/courses/hooks/`).
// TODO: `useParams()` gives `courseId: string | undefined` — calling `/api/course/${undefined}` is a bug. Guard or `return null` when undefined.
// TODO: `useEffect(() => { getCourseDetailsById().then((data) => setCourseDetails(data.course)); }, [])` — empty deps but uses `courseId` (closure capture). If the user navigates to another course id, the page won't refetch. Add `[courseId]`.
// TODO: `data` is destructured in the `.then` callback but unused due to shadowing — also `data` is already imported from `react-router-dom` at the top (an unused import; remove).
// TODO: `console.log(result)` in production code — remove.
// TODO: Empty `catch (error) {}` — swallow risk; show an error UI instead.
// TODO: When `courseDetails` is null we render "No course found.." for BOTH loading and missing — distinguish loading (spinner) from "not found".
// TODO: `<Typography>No course found..</Typography>` — use translation or a proper page-level NotFound component.
// TODO: `Course` is imported from `../adminCourses/types/course.type` (page-local). Since this file edits the same entity, the type belongs in `features/courses/types/`. See TODOs there.
// TODO: This page is the de-facto controller for "view + edit" — there's no separate view, but `EditCourseHeaderSection` only shows the name. Either flesh out the view or rename the page to clarify it is also a viewer.
import { Box, Typography } from '@mui/material';
import { CourseLessonsAreaSection } from './sections/CourseLessonsArea.section';
import { GoBackSection } from './sections/GoBack.section';
import { EditCourseHeaderSection } from './sections/EditCourseHeader.section';
import { StatisticSection } from './sections/Statistic.section';
import { useEffect, useState } from 'react';
import { Course } from '../adminCourses/types/course.type';
import { data, useParams } from 'react-router-dom';

export default function EditCoursePage() {
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const { courseId } = useParams();
  const getCourseDetailsById = async () => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {}
  };
  useEffect(() => {
    getCourseDetailsById().then((data) => setCourseDetails(data.course));
  }, []);

  const onSuccessUpdateCourse = (data: Course) => {
    setCourseDetails(data);
  };
  if (!courseDetails) return <Typography>No course found..</Typography>;
  return (
    <Box>
      <GoBackSection />
      <EditCourseHeaderSection courseDetails={courseDetails} />
      <StatisticSection />
      <CourseLessonsAreaSection course={courseDetails} onSuccess={onSuccessUpdateCourse} />
    </Box>
  );
}
