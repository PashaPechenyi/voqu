import { Box } from '@mui/material';
import { CourseLessonsAreaSection } from './sections/CourseLessonsArea.section';
import { GoBackSection } from './sections/GoBack.section';
import { EditCourseHeaderSection } from './sections/EditCourseHeader.section';
import { StatisticSection } from './sections/Statistic.section';

export default function EditCoursePage() {
  return (
    <Box>
      <GoBackSection />
      <EditCourseHeaderSection />
      <StatisticSection />
      <CourseLessonsAreaSection />
    </Box>
  );
}
