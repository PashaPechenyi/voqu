import { FC } from 'react';
import { Bookmark, MenuBook, School, Timeline } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export type FeatureCard = {
  id: string;
  Icon: FC<SvgIconProps>;
  title: string;
  subtitle: string;
};

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'levels',
    Icon: School,
    title: 'Структуровані рівні',
    subtitle: 'Від A1 до C2 за стандартом CEFR',
  },
  {
    id: 'lessons',
    Icon: MenuBook,
    title: 'Різноманітні уроки',
    subtitle: 'Словник, граматика, читання, аудіювання',
  },
  {
    id: 'progress',
    Icon: Timeline,
    title: 'Відстеження прогресу',
    subtitle: 'Бачте свій розвиток у реальному часі',
  },
  {
    id: 'dictionary',
    Icon: Bookmark,
    title: 'Особистий словник',
    subtitle: 'Зберігайте та тренуйте нові слова',
  },
];
