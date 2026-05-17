import { SvgIconComponent } from '@mui/icons-material';
import { LessonType } from '../enums/lessonType.enum';

export type Lesson = {
  id: string;
  title: string;
  duration: number;
  type: LessonType;
  isLocked: boolean;
  icon: SvgIconComponent;
};
