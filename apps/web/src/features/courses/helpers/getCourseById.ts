import { Course } from '@/features/courses/types/course.type';

type GetCourseResponse = {
  course: Course;
};

const getCourseById = async (
  courseId: Course['id'],
): Promise<GetCourseResponse | undefined> => {
  try {
    const response = await fetch(`/api/course/${courseId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Something went wrong...');
    }
    return await response.json();
  } catch (error) {
    return undefined;
  }
};

export default getCourseById;
