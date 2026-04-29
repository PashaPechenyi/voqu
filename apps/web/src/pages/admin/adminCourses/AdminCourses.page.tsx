import CoursesSection from './sections/Courses.section';
import HeroSection from './sections/HeroSection.section';
import SearchSection from './sections/SearchCourse.section';

export default function AdminCoursesLayout() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <CoursesSection />
    </div>
  );
}
