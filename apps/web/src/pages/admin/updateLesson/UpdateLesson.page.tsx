import { useLessonDetails } from '@/features/lesson/hooks/useLessonDetails';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { LessonStatus } from '@/features/lesson/types/lessonStatus.type';
import GoBackSection from '@/shared/components/goBackSection/GoBack.section';
import SectionDivider from '@/shared/components/SectionDivider/SectionDivider';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { AddSegment } from './sections/AddSegment.section';
import { UpdateLessonHeaderSection } from './sections/UpdateLessonHeader.section';
import { WordlistSegmentItem } from './sections/WordlistSegmentItem';

const lessonEx: LessonListItem = {
  id: '28cd4c25-94af-4687-8c07-64f939bd38a2',
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
  const { lessonDetails, getLessonDetails, isLoading } = useLessonDetails();
  useEffect(() => {
    if (!lessonEx.id) return;
    getLessonDetails(lessonEx.id);
    //httpClient.post(`/lesson/segment/${lessonEx.id}/mock/wordlist`);
  }, [lessonEx.id, getLessonDetails]);
  if (isLoading) return <>Loading...</>;
  if (!lessonDetails) return <>no data</>;
  return (
    <Box>
      <GoBackSection url={ADMIN_COURSES_URL} />
      <UpdateLessonHeaderSection lessonDetails={lessonDetails} />
      <SectionDivider />
      {lessonDetails?.segments.map((segment, index) => (
        <WordlistSegmentItem key={segment.id} segmentOrder={index} segment={segment} />
      ))}
      <AddSegment
        lang={lessonDetails.translationLanguage}
        lessonId={lessonEx.id}
        reloadLessonDetails={getLessonDetails}
      />
    </Box>
  );
};
