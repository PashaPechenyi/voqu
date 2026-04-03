import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

export type NavMenuItem = { label: string; path: string };
export type AdminNavMenuItem = { label: string; path: string; Icon: FC<SvgIconProps> };
export type PreviewLessonCard = {
  id: number;
  word: string;
  description: string;
  example: string;
  tr_word: string;
  tr_description: string;
  tr_example: string;
};
export type Test = {
  question: string;
  answers: string[];
  rightOption: number;
};
export type CefrLevel = {
  id: number;
  level: string;
  description: string;
  skills: string[];
};

export type MethodologyCardConst = {
  id: number;
  title: string;
  description: string;
  Icon: FC<SvgIconProps>;
};

export type Word = {
  id: string;
  word: string;
  translation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: 'verbs' | 'nouns' | 'adjectives' | 'phrases';
  learned: boolean;
  addedAt: string;
};

export type DashboardStats = {
  label: string;
  value: string;
  change: string;
  Icon: FC<SvgIconProps>;
  color: string;
};
export type RecentActivity = {
  action: string;
  course: string;
  time: string;
  type: string;
};

export type PopularCourses = {
  name: string;
  students: number;
  completion: number;
};
