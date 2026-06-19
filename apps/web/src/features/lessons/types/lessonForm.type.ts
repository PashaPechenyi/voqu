export type LessonFormValues = {
  title: string;
  subtitle: string;
  description: string;
  // TODO: status is typed as a bare string but should be LessonStatus | null to match the form's nullable draft shape (changing it requires updating DEFAULT_VALUES)
  status: string;
};
