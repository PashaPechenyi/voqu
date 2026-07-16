import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { LessonStatus } from '@/features/lesson/types/lessonStatus.type';
import GoBackSection from '@/shared/components/goBackSection/GoBack.section';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
import { Box } from '@mui/material';
import { AddTaskSection } from './sections/AddTaskSection.section';
import { UpdateLessonHeaderSection } from './sections/UpdateLessonHeader.section';

const lessonEx: LessonListItem = {
  id: ' 28cd4c25-94af-4687-8c07-64f939bd38a2',
  CourseId: '723067bc-8feb-4c38-8699-b105c6e87fb1',
  title: 'Lesson example',
  subtitle: 'Lesson example subtitle here yeah',
  description: 'Lesson example description here yeah wery long and interesting pitipiwpiw',
  order: 1,
  status: LessonStatus.Draft,
  duration: 25,
  createdAt: '2026-05-29 19:34:41.034465+00',
  updatedAt: '2026-05-29 19:34:41.034465+00',
};

export const UpdateLessonPage = () => {
  return (
    <Box>
      <GoBackSection url={ADMIN_COURSES_URL} />
      <UpdateLessonHeaderSection lesson={lessonEx} />
      <SectionDivider />
      <AddTaskSection />
    </Box>
  );
};
