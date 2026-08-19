import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import LessonIntro from './sections/LessonIntro.section';
import LessonSections from './sections/LessonSections.section';
import { Segment } from '@/features/lessons/types/lessonDetails.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useGetLessonDetails } from '@/features/lessons/hooks/useGetLessonDetails';

export type LessonDetailsStructure = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  segments: Segment[];
};

function LessonDetailsPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { getLessonDetails, lessonDetails } = useGetLessonDetails();

  useEffect(() => {
    if (lessonId) getLessonDetails(lessonId);
  }, [lessonId, getLessonDetails]);

  // TODO: add loading validation
  if (!lessonDetails) return <Typography>No data was loaded</Typography>;

  return (
    <>
      <Box sx={sxStyles.spacer}></Box>
      <LessonIntro lessonDetails={lessonDetails} />

      <LessonSections lessonDetails={lessonDetails!} getLessonDetails={getLessonDetails} />
    </>
  );
}

const sxStyles = createSxStylesList({
  spacer: { padding: '30px' },
});

export default LessonDetailsPage;
