import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import CoursesSection from './sections/Courses.section';
import HeroSection from './sections/Hero.section';
import SearchSection from './sections/Search.section';

function AdminCoursesPage() {
  const { coursesList, fetchCourses } = useCoursesList();
  const handleCourseUpdated = () => {
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <Box>
      <HeroSection refetchCourses={fetchCourses} />
      <SearchSection />
      <CoursesSection onSuccess={handleCourseUpdated} coursesList={coursesList} />
    </Box>
  );
}

export default AdminCoursesPage;
