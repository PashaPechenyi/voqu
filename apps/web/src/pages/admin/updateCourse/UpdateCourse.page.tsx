import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Course } from '@/features/courses/types/course.type';
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import CourseLessonsAreaSection from './sections/CourseLessonsArea.section';
import GoBackSection from './sections/GoBack.section';
import UpdateCourseHeaderSection from './sections/UpdateCourseHeader.section';
import StatisticSection from './sections/Statistic.section';
import { useLessonsList } from '@/features/lesson/hooks/useLessonsList';

// RENAME: EditCoursePage -> UpdateCoursePage (+ folder editCourse/ -> updateCourse/, file EditCourse.page -> UpdateCourse.page) - 'update' is the canonical mutation verb
function UpdateCoursePage() {
  const { courseId } = useParams();
  const { courseDetails, setCourseDetails, getCourseDetails } = useCourseDetails();
  const { lessonsList, getLessonsList, setLessonsList } = useLessonsList();

  useEffect(() => {
    if (!courseId) return;
    getCourseDetails(courseId);
  }, [courseId, getCourseDetails]);

  useEffect(() => {
    if (!courseId) return;
    getLessonsList(courseId);
  }, [courseId, getLessonsList]);

  const handleCourseUpdated = (updatedCourse: Course) => {
    setCourseDetails(updatedCourse);
  };

  if (!courseDetails) return <Typography>No course found..</Typography>;

  return (
    <Box>
      <GoBackSection />
      <UpdateCourseHeaderSection reloadLessons={getLessonsList} course={courseDetails} />
      <StatisticSection lessonsList={lessonsList} />
      <CourseLessonsAreaSection
        setLessonsList={setLessonsList}
        lessonsList={lessonsList}
        course={courseDetails}
        onUpdateSuccess={handleCourseUpdated}
        reloadLessons={getLessonsList}
      />
    </Box>
  );
}

export default UpdateCoursePage;
