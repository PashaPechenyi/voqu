export interface IReorderSegmentItem {
  SegmentId: string;
  order: number;
}

export interface IReorderSegmentsParams {
  LessonId: string;
  items: IReorderSegmentItem[];
}
