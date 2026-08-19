import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import LessonIntro from './sections/LessonIntro.section';
import LessonSections from './sections/LessonSections.section';
import {
  LessonDetails as LessonDetailsType,
  Segment,
} from '@/features/lessons/types/lessonDetails.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useGetLessonDetails } from '@/features/lessons/hooks/useGetLessonDetails';

type LessonDetails = {};
// export type Segment = {
//   id: string;
//   title: string;
//   description: string;
//   wordsList: Word[] | [];
// };

export type LessonDetailsStructure = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  segments: Segment[];
};

function LessonDetailsPage({}: LessonDetailsType) {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { getLessonDetails, lessonDetails } = useGetLessonDetails();

  // const addSegment = (segment: Segment) => {
  //   setStructure((prev) => ({
  //     ...prev,
  //     segments: [...prev.segments, segment],
  //   }));
  // };

  useEffect(() => {
    if (lessonId) getLessonDetails(lessonId);
  }, [lessonId, getLessonDetails]);

  return (
    <>
      <Box sx={sxStyles.spacer}></Box>
      {lessonDetails ? <LessonIntro lessonDetails={lessonDetails} /> : ''}

      {lessonDetails ? (
        <LessonSections
          lessonDetails={lessonDetails!}
          //handleSegment={addSegment}
          getLessonDetails={getLessonDetails}
        />
      ) : (
        ''
      )}
    </>
  );
}

const sxStyles = createSxStylesList({
  spacer: { padding: '30px' },
});

export default LessonDetailsPage;
