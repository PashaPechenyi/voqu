// TODO: Folder is `consts/` but every other feature in the project uses `constants/`. Rename to `features/lesson/constants/`.
// TODO: Single file `lessons.ts` mixes THREE different concerns: (1) the `Lesson` type — should be `features/lesson/types/lesson.type.ts`, (2) seeded data `initialLessons` — should be `features/lesson/constants/initialLessons.const.ts`, (3) icon/color maps `lessonTypeIcons`/`lessonTypeColors` — should be `features/lesson/constants/lessonTypeIcons.const.ts` and `lessonTypeColors.const.ts`. Split per the project pattern.
// TODO: `Lesson['type']` is a string union but the same set is also expressed as `ExerciseTypeKey` enum in `features/courseLevel/types/`. One source of truth.
// TODO: `initialLessons` is hardcoded per-category data but the consumer (`StatisticSection`, `CourseLessonsAreaSection`) always reads `.grammar` regardless of which course is open — that is a bug masked by mock data. Wire to a real `useGetLessons(courseId)` hook.
// TODO: `lessonTypeColors` uses raw hex strings — those also appear in the MUI theme. Reference theme palette instead of the literal strings.
// TODO: `Record<string, string>` is too loose; type as `Record<Lesson['type'], string>` so adding a new lesson type is a compile error if a color is missing.
// TODO: File name `lessons.ts` should be `lessons.const.ts` (per project pattern) — or split as above.
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
export type Lesson = {
  id: string;
  title: string;
  duration: number;
  type: 'reading' | 'listening' | 'grammar' | 'quiz';
  locked: boolean;
  order: number;
};

export const initialLessons: Record<string, Lesson[]> = {
  grammar: [
    {
      id: '1',
      title: 'Introduction to Tenses',
      duration: 12,
      type: 'reading',
      locked: false,
      order: 1,
    },
    {
      id: '2',
      title: 'Present Simple vs Present Continuous',
      duration: 15,
      type: 'grammar',
      locked: false,
      order: 2,
    },
    {
      id: '3',
      title: 'Present Tense Practice Quiz',
      duration: 8,
      type: 'quiz',
      locked: false,
      order: 3,
    },
    {
      id: '4',
      title: 'Past Simple - Regular Verbs',
      duration: 14,
      type: 'reading',
      locked: false,
      order: 4,
    },
    {
      id: '5',
      title: 'Past Simple - Irregular Verbs',
      duration: 16,
      type: 'grammar',
      locked: false,
      order: 5,
    },
  ],
  vocabulary: [
    {
      id: '1',
      title: 'Business English Essentials',
      duration: 15,
      type: 'reading',
      locked: false,
      order: 1,
    },
    { id: '2', title: 'Workplace Idioms', duration: 12, type: 'grammar', locked: false, order: 2 },
  ],
  speaking: [
    {
      id: '1',
      title: 'Greetings and Introductions',
      duration: 10,
      type: 'listening',
      locked: false,
      order: 1,
    },
  ],
  listening: [
    {
      id: '1',
      title: 'News Reports - Basic',
      duration: 15,
      type: 'listening',
      locked: false,
      order: 1,
    },
  ],
};
export const lessonTypeIcons = {
  reading: MenuBookIcon,
  listening: HeadphonesIcon,
  grammar: DescriptionOutlinedIcon,
  quiz: ModeCommentOutlinedIcon,
};

export const lessonTypeColors: Record<string, string> = {
  reading: '#71677C',
  listening: '#A99F96',
  grammar: '#37123C',
  quiz: '#71677C',
};
