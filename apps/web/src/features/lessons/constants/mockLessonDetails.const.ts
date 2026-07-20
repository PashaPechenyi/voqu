import { WordType } from '../enums/lessonWordType.enum';
import { LessonDetailsStructure } from '../types/lessonDetails.type';

// RENAME: STRUCTURE_EXAMPLE -> MOCK_LESSON_DETAILS - mock/example data is named MOCK_*
export const MOCK_LESSON_DETAILS: LessonDetailsStructure = {
  id: 'lesson_id',
  title: 'lesson_title',
  subtitle: 'lesson_subtitle',
  description: 'lesson_description',
  segments: [
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
          type: 'phrase',
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
