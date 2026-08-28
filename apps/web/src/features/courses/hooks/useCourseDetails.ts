import { useMutation } from './../../../shared/api/useMutation';
import { useState } from 'react';
import { getCourseDetailsReq } from '@/features/courses/helpers/getCourseDetailsReq.helper';
import { Course } from '@/features/courses/types/course.type';

export const useCourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);

  const { mutate: getCourseDetails } = useMutation({
    mutationFn: getCourseDetailsReq,
    onSuccess(response) {
      setCourseDetails(response.course);
    },
  });

  return { courseDetails, setCourseDetails, getCourseDetails };
};
