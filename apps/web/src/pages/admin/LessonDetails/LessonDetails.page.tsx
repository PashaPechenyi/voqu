import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import LessonIntro from './sections/LessonIntro.section';
import LessonSections from './sections/LessonSections.section';
import {
  LessonDetails as LessonDetailsType,
  Segment,
} from '@/features/lessons/types/lessonDetails.type';
import { WordType } from '@/features/lessons/enums/lessonWordType.enum';
import { Word } from '@/features/lessons/types/word.type';
import { MOCK_LESSON_DETAILS } from '@/features/lessons/constants/mockLessonDetails.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useGetLessonDetails } from '@/features/lessons/hooks/useGetLessonDetails';
import { httpClient } from '@/shared/api';

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
// const STRUCTURE_EXAMPLE: LessonDetailsStructure = {
//   id: 'lesson_id',
//   title: 'lesson_title',
//   subtitle: 'lesson_subtitle',
//   description: 'lesson_description',
//   segments: [
//     // Wordlist Segment
//     {
//       id: 'segment_id',
//       title: 'segment_title',
//       description: 'segment_description',
//       wordsList: [
//         {
//           id: 'word_id',
//           word: 'invite',
//           transcription: 'ɪnˈvaɪt',
//           partOfSpeech: WordType.Verb,
//           translation: 'запрошувати',
//           type: 'phrase', // phrase/verb
//           secondTense: 'invited',
//           thirdTense: 'invited',
//           examples: [
//             {
//               value: 'aaab',
//               translation: 'bbb1',
//             },
//             {
//               value: 'aaa',
//               translation: 'bbb',
//             },
//             {
//               value: 'cccc',
//               translation: 'dddd',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

function LessonDetailsPage({}: LessonDetailsType) {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { getLessonDetails, lessonDetails } = useGetLessonDetails();
  //const [structure, setStructure] = useState<LessonDetailsType | null>(lessonDetails);

  // const addSegment = (segment: Segment) => {
  //   setStructure((prev) => ({
  //     ...prev,
  //     segments: [...prev.segments, segment],
  //   }));
  // };

  useEffect(() => {
    if (lessonId) getLessonDetails(lessonId);
    //httpClient.post(`/lesson/segment/${lessonId}/mock/wordlist`);
  }, [lessonId, getLessonDetails]);

  // TODO: lesson details are never fetched; the page renders MOCK_LESSON_DETAILS instead of loading by lessonId.

  return (
    <>
      <Box sx={sxStyles.spacer}></Box>
      {lessonDetails ? <LessonIntro lessonDetails={lessonDetails} /> : ''}

      {lessonDetails ? (
        <LessonSections
          lessonDetails={lessonDetails!}
          //handleSegment={addSegment}
          handleSegment={() => {}}
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
