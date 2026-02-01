export type NavMenuItem = { label: string; path: string };
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
  answers: {
    1: string;
    2: string;
    3: string;
  };
  rightOption: number;
};
