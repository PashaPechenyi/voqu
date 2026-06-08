import { useCallback, useState } from 'react';
import { getCourseDetailsReq } from '@/features/courses/helpers/getCourseDetailsReq.helper';
import { Course } from '@/features/courses/types/course.type';

export const useCourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);

  const getCourseDetails = useCallback(async (courseId: Course['id']) => {
    const result = await getCourseDetailsReq(courseId);
    setCourseDetails(result.course);
  }, []);

  return { courseDetails, setCourseDetails, getCourseDetails };
};
