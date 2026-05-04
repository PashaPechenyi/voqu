import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useEffect, useState } from 'react';
import { Course } from '../types/course.type';
import { CourseCardSection } from './CourseCard.section';

export default function CoursesSection() {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const getCourses = async () => {
    const response = await fetch('/api/course', {
      method: 'GET',
    });
    //console.log(response);

    const result = await response.json();
    console.log(result);
    return result;
  };

  useEffect(() => {
    getCourses().then((responce) => {
      setCoursesData(responce.items);
    });
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
