export interface IReorderLessonItem {
  LessonId: string;
  order: number;
}

export interface IReorderLessonsParams {
  /** Course whose lessons are being reordered. */
  CourseId: string;
  /** New order for each lesson. */
  items: IReorderLessonItem[];
}
