import { CefrLevel } from '@/features/levels/types/cefrLevel.type';

export const CEFR_LEVELS: CefrLevel[] = [
  {
    id: 1,
    level: 'A1 - Beginner',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    skills: [
      'Introduce yourself and others',
      'Ask and answer simple personal questions',
      'Interact in a simple way with slow, clear speech',
      'Understand basic signs and notices',
    ],
  },
  {
    id: 2,
    level: 'A2 - Elementary',
    description:
      'Can communicate in simple and routine tasks requiring direct exchange of information.',
    skills: [
      'Describe your background and immediate environment',
      'Express immediate needs in simple terms',
      'Understand frequently used expressions',
      'Handle simple, direct exchanges',
    ],
  },
  {
    id: 3,
    level: 'B1 - Intermediate',
    description:
      'Can deal with most situations likely to arise while traveling in an English-speaking area.',
    skills: [
      'Describe experiences, events, and dreams',
      'Give reasons and explanations for opinions',
      'Understand the main points of clear standard speech',
      'Write simple connected text on familiar topics',
    ],
  },
  {
    id: 4,
    level: 'B2 - Upper Intermediate',
    description: 'Can interact with a degree of fluency and spontaneity with native speakers.',
    skills: [
      'Understand complex texts on concrete and abstract topics',
      'Produce clear, detailed text on a wide range of subjects',
      'Express viewpoints on topical issues',
      'Interact with spontaneity and fluency',
    ],
  },
  {
    id: 5,
    level: 'C1 - Advanced',
    description:
      'Can use language flexibly and effectively for social, academic, and professional purposes.',
    skills: [
      'Understand a wide range of demanding, longer texts',
      'Express ideas fluently and spontaneously',
      'Produce clear, well-structured, detailed text',
      'Use organizational patterns effectively',
    ],
  },
  {
    id: 6,
    level: 'C2 - Proficiency',
    description: 'Can understand virtually everything heard or read with ease.',
    skills: [
      'Summarize information from different sources',
      'Express yourself spontaneously, very fluently, and precisely',
      'Understand implicit meanings in complex situations',
      'Reconstruct arguments coherently',
    ],
  },
];
