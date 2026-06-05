export const deleteLessonReq = async (lessonId: string): Promise<void> => {
  const response = await fetch(`/api/course/lesson/${lessonId}/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to create lesson');
};
