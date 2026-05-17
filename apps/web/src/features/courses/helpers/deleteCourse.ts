import { Course } from '@/features/courses/types/course.type';

const deleteCourse = async (courseId: Course['id']): Promise<void> => {
  const response = await fetch(`/api/course/${courseId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
};

export default deleteCourse;
