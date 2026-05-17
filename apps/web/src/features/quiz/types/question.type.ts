export type AnswerVariant = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  question: string;
  variants: AnswerVariant[];
  answerId: AnswerVariant['id'];
};
