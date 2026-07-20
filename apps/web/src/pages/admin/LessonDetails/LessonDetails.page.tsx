import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import LessonIntro from './sections/LessonIntro.section';
import LessonSections from './sections/LessonSections.section';
import { LessonDetailsStructure, Segment } from '@/features/lessons/types/lessonDetails.type';
import { MOCK_LESSON_DETAILS } from '@/features/lessons/constants/mockLessonDetails.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const LessonDetailsPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [structure, setStructure] = useState<LessonDetailsStructure>(MOCK_LESSON_DETAILS);
  const addSegment = (segment: Segment) => {
    setStructure((prev) => ({
      ...prev,
      segments: [...prev.segments, segment],
    }));
  };
  // TODO: lesson details are never fetched; the page renders MOCK_LESSON_DETAILS instead of loading by lessonId.
  useEffect(() => {
    // fetchCourseById(lessonId);
  }, [lessonId]);
  return (
    <>
      <Box sx={sxStyles.spacer}></Box>
      <LessonIntro lessonDetails={MOCK_LESSON_DETAILS} />
      <LessonSections
        lessonDetails={structure}
        setLessonDetails={setStructure}
        handleSegment={addSegment}
      />
    </>
  );
};

const sxStyles = createSxStylesList({
  spacer: { padding: '30px' },
});

export default LessonDetailsPage;
