import { Course } from '@/features/courses/types/course.type';

// RENAME: ReorderLessonsBody -> ReorderLessonsReqBody - request body types carry the ReqBody suffix
type ReorderLessonsReqBody = {
  items: {
    LessonId: string;
    order: number;
  }[];
};

// RENAME: changeLessonOrder -> reorderLessonsReq - calls fetch() so must end in Req; "reorder" is the canonical verb
export const reorderLessonsReq = async (
  body: ReorderLessonsReqBody,
  courseId: Course['id'],
): Promise<void> => {
  const response = await fetch(`/api/course/lesson/${courseId}/reorder`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Failed to change lesson's order");
};
