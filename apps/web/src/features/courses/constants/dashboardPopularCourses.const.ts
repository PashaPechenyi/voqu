// TODO: This is hardcoded mock data shown in production-quality UI. Wire it to a real `/api/...` endpoint via a `useGetPopularCourses` hook (mirror `useGetCourses`).
// TODO: Constant name `popularCourses` clashes semantically with `initialCourses` in the same `constants/` folder — name it `MOCK_POPULAR_COURSES` until the API exists, so it's obvious this is placeholder data.
import { PopularCourses } from '../types/popularCourses.type';
export const popularCourses: PopularCourses[] = [
  { name: 'English Grammar Essentials', students: 342, completion: 72 },
  { name: 'Advanced Vocabulary Builder', students: 289, completion: 65 },
  { name: 'Everyday Conversations', students: 256, completion: 81 },
  { name: 'Listening Comprehension', students: 198, completion: 58 },
];
