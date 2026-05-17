import { LevelDescription } from '../types/levelDescription.type';

export const MOCK_LEVELS: LevelDescription[] = [
  {
    label: 'A1-Beginner',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    skills: [
      'Introduce yourself and others',
      'Ask and answer simple personal questions',
      'Interact in a simple way with slow, clear speech',
      'Understand basic signs and notices',
    ],
  },
  {
    label: 'A2-Elementary',
    description:
      'Can communicate in simple and routine tasks requiring direct exchange of information.',
    skills: [
      'Describe your background and immediate environment',
      'Express immediate needs in simple terms',
      'Understand frequently used expressions',
      'Handle simple, direct exchanges',
    ],
  },
];
