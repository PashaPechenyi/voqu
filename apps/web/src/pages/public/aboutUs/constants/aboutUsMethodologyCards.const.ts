import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { MethodologyCardItem } from '@/shared/components/MethodologyCard/MethodologyCard.type';

export const ABOUT_US_METHODOLOGY_CARDS: MethodologyCardItem[] = [
  {
    id: 1,
    title: 'Vocabulary Introduction',
    description: 'Learn new words with definitions, pronunciation guides, and real-world examples',
    Icon: ImportContactsIcon,
  },
  {
    id: 2,
    title: 'Interactive Practice',
    description: 'Engage with quizzes, matching exercises, and fill-in-the-blank activities',
    Icon: DonutLargeRoundedIcon,
  },
  {
    id: 3,
    title: 'Conversation Application',
    description: 'Use new vocabulary in context through dialogue practice and role-play scenarios',
    Icon: ChatBubbleOutlineOutlinedIcon,
  },
  {
    id: 4,
    title: 'Assessment & Review',
    description: 'Test your understanding and receive personalized feedback on your progress',
    Icon: DescriptionOutlinedIcon,
  },
];
