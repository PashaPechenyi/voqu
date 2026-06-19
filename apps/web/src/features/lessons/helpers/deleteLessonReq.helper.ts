export const deleteLessonReq = async (lessonId: string): Promise<void> => {
  // TODO: error message says "create" but this deletes a lesson — fix the copy-pasted message
  const response = await fetch(`/api/course/lesson/${lessonId}/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to create lesson');
};
