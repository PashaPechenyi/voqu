import { Course } from '@/pages/admin/adminCourses/types/course.type';
import { CourseFormValues } from '../types/courseFormValues.type';

type UseEditCourseProps = {
  onSuccess?: (data: Course) => void;
};

const useEditCourse = ({ onSuccess }: UseEditCourseProps) => {
  const updateCourseById = async (courseId: Course['id'], data: CourseFormValues) => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }

      const result = await response.json();

      //console.log(result, 'byid');
      onSuccess?.(result.course);
    } catch (error) {}
  };

  return { updateCourseById };
};

export default useEditCourse;
