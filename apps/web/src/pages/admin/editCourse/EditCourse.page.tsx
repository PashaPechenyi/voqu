import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Course } from '@/features/courses/types/course.type';
import useGetCourseById from '@/features/courses/hooks/useGetCourseById';
import CourseLessonsAreaSection from './sections/CourseLessonsArea.section';
import GoBackSection from './sections/GoBack.section';
import EditCourseHeaderSection from './sections/EditCourseHeader.section';
import StatisticSection from './sections/Statistic.section';

function EditCoursePage() {
  const { courseId } = useParams();
  const { course, setCourse, fetchCourseById } = useGetCourseById();

  useEffect(() => {
    if (!courseId) return;
    fetchCourseById(courseId);
  }, [courseId, fetchCourseById]);

  const handleCourseUpdated = (updatedCourse: Course) => {
    setCourse(updatedCourse);
  };

  if (!course) return <Typography>No course found..</Typography>;

  return (
    <Box>
      <GoBackSection />
      <EditCourseHeaderSection course={course} />
      <StatisticSection />
      <CourseLessonsAreaSection course={course} onSuccess={handleCourseUpdated} />
    </Box>
  );
}

export default EditCoursePage;
