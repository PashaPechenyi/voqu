export interface IReorderLessonItem {
  LessonId: string;
  order: number;
}

export interface IReorderLessonsParams {
  /** New order for each lesson. */
  items: IReorderLessonItem[];
}
