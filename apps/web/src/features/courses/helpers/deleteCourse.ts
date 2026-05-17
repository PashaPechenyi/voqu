// TODO: Empty stub — implement the real `fetch(`/api/course/${courseId}`, { method: 'DELETE' })` here, then call from a `useDeleteCourse` hook used by `DeleteCourseModal`. Right now the modal does its own (broken — uses GET) fetch instead of using this helper.
// TODO: Imports `Course` from `pages/admin/adminCourses/...`. Move `Course` into `features/courses/types/` so helpers don't reach into page-local types.
// TODO: Once implemented, return a `Promise<void>` or a typed result; never leave `() => {}`.
import { Course } from '@/pages/admin/adminCourses/types/course.type';

const deleteCourse = (courseId: Course['id']) => {};
