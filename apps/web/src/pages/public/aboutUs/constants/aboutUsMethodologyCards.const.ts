// TODO: Constant array name is fine; `id` is sequential and used for parity / rendering — confirm we don't actually need an id (the parent uses `cardData.id` for `dir` and the badge label). If only the badge label is needed, derive `cardIndex + 1`.
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { MethodologyCardData } from '@/shared/components/MethodologyCard/MethodologyCard.types';

export const aboutUsMethodologyCards: MethodologyCardData[] = [
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
