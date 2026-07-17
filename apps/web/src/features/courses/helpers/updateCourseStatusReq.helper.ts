import { Course } from '../types/course.type';
import { CourseStatus } from '../enums/courseStatus.enum';
import { httpClient } from '@/shared/api';

export const updateCourseStatusReq = async (course: Course) => {
  const nextStatus =
    course.status === CourseStatus.Draft ? CourseStatus.Published : CourseStatus.Draft;

  const body = {
    LevelId: course.Level?.id,
    name: course.name,
    status: nextStatus,
    description: course.description,
  };
  return httpClient.patch(`/course/${course.id}`, body);
};
