import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { LessonSegmentType } from '@/features/lesson/types/lessonSegmentType.type';

export const LESSON_SEGMENT_ICONS: Record<LessonSegmentType, typeof MenuBookIcon> = {
  reading: MenuBookIcon,
  listening: HeadphonesIcon,
  grammar: DescriptionOutlinedIcon,
  quiz: ModeCommentOutlinedIcon,
};
