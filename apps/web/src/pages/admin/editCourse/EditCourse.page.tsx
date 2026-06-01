import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Course } from '@/features/courses/types/course.type';
import { useCourseById } from '@/features/courses/hooks/useCourseById';
import CourseLessonsAreaSection from './sections/CourseLessonsArea.section';
import GoBackSection from './sections/GoBack.section';
import EditCourseHeaderSection from './sections/EditCourseHeader.section';
import StatisticSection from './sections/Statistic.section';
import { useLessonsList } from '@/features/lesson/hooks/useLessonsList';

function EditCoursePage() {
  const { courseId } = useParams();
  const { course, setCourse, fetchCourseById } = useCourseById();
  const { lessonsList, fetchLessons, setLessonsList } = useLessonsList();

  useEffect(() => {
    if (!courseId) return;
    fetchCourseById(courseId);
    fetchLessons(courseId);
  }, [courseId, fetchCourseById, fetchLessons]);

  const handleCourseUpdated = (updatedCourse: Course) => {
    setCourse(updatedCourse);
  };
  if (!course) return <Typography>No course found..</Typography>;

  return (
    <Box>
      <GoBackSection />
      <EditCourseHeaderSection refetchLessons={fetchLessons} course={course} />
      <StatisticSection lessonsList={lessonsList} />
      <CourseLessonsAreaSection
        setLessonsList={setLessonsList}
        lessonsList={lessonsList}
        course={course}
        onSuccess={handleCourseUpdated}
      />
    </Box>
  );
}

export default EditCoursePage;
