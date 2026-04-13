import CoursesSection from './adminCourses/CoursesSection';
import HeroSection from './adminCourses/HeroSection';
import SearchSection from './adminCourses/SearchSection';

export default function AdminCoursesLayout() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <CoursesSection />
    </div>
  );
}
