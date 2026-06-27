import { Course } from '../types/course.type';
import { CourseStatus } from '../enums/courseStatus.enum';
import { httpClient } from '@/shared/api';

// export const updateCourseStatusReq = async (course: Course): Promise<void> => {
//   const nextStatus =
//     course.status === CourseStatus.Draft ? CourseStatus.Published : CourseStatus.Draft;

//   const body = {
//     LevelId: course.Level?.id,
//     name: course.name,
//     status: nextStatus,
//     description: course.description,
//   };

//   const response = await fetch(`/api/course/${course.id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });
//   if (!response.ok) throw new Error('Failed to update course status');
// };

export const updateCourseStatusReq = async (course: Course) => {
  const nextStatus =
    course.status === CourseStatus.Draft ? CourseStatus.Published : CourseStatus.Draft;

  const body = {
    LevelId: course.Level?.id,
    name: course.name,
    status: nextStatus,
    description: course.description,
  };
  return httpClient.patch(`/course/${course.id}`, JSON.stringify(body));
};
