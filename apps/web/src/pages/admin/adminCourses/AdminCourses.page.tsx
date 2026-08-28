import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import CoursesSection from './sections/Courses.section';
import HeroSection from './sections/Hero.section';
import SearchSection from './sections/Search.section';

function AdminCoursesPage() {
  const { coursesList, getCoursesList } = useCoursesList();
  const handleCourseUpdated = () => {
    getCoursesList();
  };

  useEffect(() => {
    getCoursesList();
  }, []);

  return (
    <Box>
      <HeroSection reloadCourses={getCoursesList} />
      <SearchSection />
      <CoursesSection onUpdateSuccess={handleCourseUpdated} coursesList={coursesList} />
    </Box>
  );
}

export default AdminCoursesPage;
