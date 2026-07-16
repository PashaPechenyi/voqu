import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LessonIntro from './sections/LessonIntro.section';
import LessonSections from './sections/LessonSections.section';
import { Word } from '@/features/lessons/components/CreateVocabularySectionModal';
import { WordType } from '@/features/lessons/enums/lessonWordType.enum';

type LessonDetails = {};
export type Segment = {
  id: string;
  title: string;
  description: string;
  wordsList: Word[] | [];
};

export type LessonDetailsStructure = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  segments: Segment[];
};
const STRUCTURE_EXAMPLE: LessonDetailsStructure = {
  id: 'lesson_id',
  title: 'lesson_title',
  subtitle: 'lesson_subtitle',
  description: 'lesson_description',
  segments: [
    // Wordlist Segment
    {
      id: 'segment_id',
      title: 'segment_title',
      description: 'segment_description',
      wordsList: [
        {
          id: 'word_id',
          word: 'invite',
          transcription: 'ɪnˈvaɪt',
          partOfSpeech: WordType.Verb,
          translation: 'запрошувати',
          type: 'phrase', // phrase/verb
          secondTense: 'invited',
          thirdTense: 'invited',
          examples: [
            {
              value: 'aaa',
              translation: 'bbb',
            },
            {
              value: 'aaa1',
              translation: 'bbb1',
            },
          ],
        },
      ],
    },
  ],
};

function LessonDetailsPage({}: LessonDetails) {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [structure, setStructure] = useState<LessonDetailsStructure>(STRUCTURE_EXAMPLE);
  const addSegment = (segment: Segment) => {
    setStructure((prev) => ({
      ...prev,
      segments: [...prev.segments, segment],
    }));
  };
  useEffect(() => {
    // fetchCourseById(lessonId);
  }, [lessonId]);
  return (
    <>
      <Box sx={{ padding: '30px' }}></Box>
      <LessonIntro LessonDetails={STRUCTURE_EXAMPLE} />
      <LessonSections
        lessonDetails={structure}
        setLesonDetails={setStructure}
        handleSegment={addSegment}
      />
    </>
  );
}

export default LessonDetailsPage;
