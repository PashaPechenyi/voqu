export type CreateLessonReqBody = {
  title: string;
  subtitle: string;
  description: string;
  duration?: number;
  status: string;
};
