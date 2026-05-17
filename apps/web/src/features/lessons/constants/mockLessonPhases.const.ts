import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import RadarIcon from '@mui/icons-material/Radar';
import { LessonPhase } from '../types/lessonPhase.type';

export const MOCK_LESSON_PHASES: LessonPhase[] = [
  {
    icon: ImportContactsIcon,
    title: 'Vocabulary Introduction',
    description: 'Learn new words with definitions, pronunciation guides, and real-world examples',
  },
  {
    icon: RadarIcon,
    title: 'Interactive Practice',
    description: 'Engage with quizzes, matching exercises, and fill-in-the-blank activities',
  },
  {
    icon: RadarIcon,
    title: 'Conversation Application',
    description: 'Use new vocabulary in context through dialogue practice and role-play scenarios',
  },
  {
    icon: RadarIcon,
    title: 'Assessment & Review',
    description: 'Test your understanding and receive personalized feedback on your progress',
  },
];
