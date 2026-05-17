import { FC, useState } from 'react';
import IntroSection from './sections/Intro.section';
import CoursesSection from './sections/Courses.section';
import { CourseStatusFilterValue } from '@/features/search/constants/courseStatusFilterOptions.const';

const CoursesPage: FC = () => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<CourseStatusFilterValue>('all');

  return (
    <>
      <IntroSection
        onSearchChange={setEnteredValue}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <CoursesSection enteredValue={enteredValue} statusFilter={statusFilter} />
    </>
  );
};

export default CoursesPage;
