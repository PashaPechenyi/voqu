import { SvgIconComponent } from '@mui/icons-material';
import { LessonTypeKey } from '../constants/lessonType.constant';

export type LessonPhase = {
  icon: SvgIconComponent;
  title: string;
  description: string;
};
 export type Lesson = {
  title: string;
  duration: number;
  type: LessonTypeKey;
  islocked: boolean;
  icon: any;
};
