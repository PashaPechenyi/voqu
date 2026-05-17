export const LANDING_PAGE_URL = '/';
export const ABOUT_URL = '/about';
export const ADMIN_URL = '/admin';
export const ADMIN_COURSES_URL = '/admin/courses';
export const ADMIN_COURSE_DETAILS_URL = (courseId: string) =>
  `${ADMIN_COURSES_URL}/${courseId}/edit`;
