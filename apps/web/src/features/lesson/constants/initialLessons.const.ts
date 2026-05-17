import { Lesson } from '@/features/lesson/types/lesson.type';
import { LessonSegmentType } from '@/features/lesson/types/lessonSegmentType.type';

export const INITIAL_LESSONS: Record<string, Lesson[]> = {
  grammar: [
    {
      id: '1',
      title: 'Introduction to Tenses',
      duration: 12,
      segmentType: LessonSegmentType.reading,
      locked: false,
      order: 1,
    },
    {
      id: '2',
      title: 'Present Simple vs Present Continuous',
      duration: 15,
      segmentType: LessonSegmentType.grammar,
      locked: false,
      order: 2,
    },
    {
      id: '3',
      title: 'Present Tense Practice Quiz',
      duration: 8,
      segmentType: LessonSegmentType.quiz,
      locked: false,
      order: 3,
    },
    {
      id: '4',
      title: 'Past Simple - Regular Verbs',
      duration: 14,
      segmentType: LessonSegmentType.reading,
      locked: false,
      order: 4,
    },
    {
      id: '5',
      title: 'Past Simple - Irregular Verbs',
      duration: 16,
      segmentType: LessonSegmentType.grammar,
      locked: false,
      order: 5,
    },
  ],
  vocabulary: [
    {
      id: '1',
      title: 'Business English Essentials',
      duration: 15,
      segmentType: LessonSegmentType.reading,
      locked: false,
      order: 1,
    },
    {
      id: '2',
      title: 'Workplace Idioms',
      duration: 12,
      segmentType: LessonSegmentType.grammar,
      locked: false,
      order: 2,
    },
  ],
  speaking: [
    {
      id: '1',
      title: 'Greetings and Introductions',
      duration: 10,
      segmentType: LessonSegmentType.listening,
      locked: false,
      order: 1,
    },
  ],
  listening: [
    {
      id: '1',
      title: 'News Reports - Basic',
      duration: 15,
      segmentType: LessonSegmentType.listening,
      locked: false,
      order: 1,
    },
  ],
};
