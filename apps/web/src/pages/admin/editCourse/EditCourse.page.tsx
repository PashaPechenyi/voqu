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
