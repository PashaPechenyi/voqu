import { LessonStatus } from '../enums/lessonStatus.enum';
import { WordType } from '../enums/lessonWordType.enum';
import { LessonDetails, LessonDetailsStructure } from '../types/lessonDetails.type';

// RENAME: STRUCTURE_EXAMPLE -> MOCK_LESSON_DETAILS - mock/example data is named MOCK_*
export const MOCK_LESSON_DETAILS: LessonDetails = {
  id: 'fa2d7249-421b-4296-ae4a-15482ea3939c',
  CourseId: 'c338d774-f92d-4109-b0a5-f49ddf045fc8',
  description: {
    value: "dskfgm klsfngrk riltj tei/lrjhglti lkgdfbkl/dsfgkrt'awri .",
    translation: null,
  },
  duration: null,
  order: 0,
  segments: [],
  sourceLanguage: 'en',
  status: LessonStatus.Draft,
  subtitle: { value: 'Past simple & Past continuous ', translation: null },
  title: { value: 'Past tenses', translation: null },
  translationLanguage: 'uk',
};
