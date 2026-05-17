// TODO: A quiz is a business concept tied to courses/lessons, not a generic, business-agnostic primitive. Per the rules in CLAUDE.md, this should live under `features/quiz/types/quizEntry.type.ts` (or `features/lesson/types/...`) — not in `shared/types/`.
export type QuizEntry = {
  question: string;
  answers: string[];
  rightOption: number;
};
