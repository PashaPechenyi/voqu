import { SvgIconComponent } from '@mui/icons-material';
import { LessonType } from '../enums/lessonType.enum';
import { LessonStatus } from './lessonStatus.type';

// export type Lesson = {
//   id: string;
//   title: string;
//   duration: number;
//   type: LessonType;
//   isLocked: boolean;
//   icon: SvgIconComponent;
// };
export type LessonListItem = {
  id: string;
  CourseId: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  status: LessonStatus;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
};
