import { Course } from '../types/course.type';

export const deleteCourseReq = async (id: Course['id']): Promise<void> => {
  const response = await fetch(`/api/course/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to delete course');
};
