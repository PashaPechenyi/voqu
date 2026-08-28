import { Segment } from '../types/lessonDetails.type';

export const convertReorderSegmentToApiFormat = (segments: Segment[]) => {
  const convertedSegments = segments.map((segment, index) => ({
    SegmentId: segment.id,
    order: index,
  }));
  return { items: convertedSegments };
};
