// TODO: Function is named `AdminCoursesLayout` but the file is `AdminCourses.page.tsx`. It is a page, not a layout. Rename to `AdminCoursesPage`.
// TODO: `<div>` wrapper offers nothing — replace with `<Box>` or a fragment. Mixing raw HTML elements with MUI is inconsistent everywhere else.
// TODO: `SearchSection` is a search input that needs to filter `CoursesSection`'s data. Right now they are siblings with no shared state, so the search does nothing. Lift the search/filter state into this page and pass it down — or use a query string in the URL.
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
