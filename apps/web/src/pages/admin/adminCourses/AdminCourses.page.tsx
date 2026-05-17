import { Box } from '@mui/material';
import CoursesSection from './sections/Courses.section';
import HeroSection from './sections/Hero.section';
import SearchSection from './sections/Search.section';

function AdminCoursesPage() {
  return (
    <Box>
      <HeroSection />
      <SearchSection />
      <CoursesSection />
    </Box>
  );
}

export default AdminCoursesPage;
