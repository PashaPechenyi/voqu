import { Course } from '@/features/courses/types/course.type';

type GetCoursesResponse = {
  items: Course[];
};

const getCourses = async (): Promise<GetCoursesResponse | undefined> => {
  try {
    const response = await fetch('/api/course', {
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

export default getCourses;
