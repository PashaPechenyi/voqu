import { Box } from '@mui/material';
import { CourseLessonsAreaSection } from './sections/CourseLessonsArea.section';
import { GoBackSection } from './sections/GoBack.section';
import { HeroSection } from './sections/Hero.section';
import { StatisticSection } from './sections/Statistic.section';

export default function EditCoursePage() {
  return (
    <Box>
      <GoBackSection />
      <HeroSection />
      <StatisticSection />
      <CourseLessonsAreaSection />
    </Box>
  );
}
