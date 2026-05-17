import { Course } from '@/features/courses/types/course.type';
import { CourseFormValues } from '../types/courseFormValues.type';
import { convertCourseFormDataToAPIFormat } from '../helpers/convertCourseFormDataToAPIFormat';

type UseEditCourseProps = {
  onSuccess?: (updatedCourse: Course) => void;
};

type UpdateCourseResponse = {
  course: Course;
};

const useEditCourse = ({ onSuccess }: UseEditCourseProps) => {
  const updateCourseById = async (courseId: Course['id'], formValues: CourseFormValues) => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'PATCH',
        body: JSON.stringify(convertCourseFormDataToAPIFormat(formValues)),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const result: UpdateCourseResponse = await response.json();
      onSuccess?.(result.course);
    } catch (error) {
      // Surface the error via UI once an error-toaster is in place.
    }
  };

  return { updateCourseById };
};

export default useEditCourse;
