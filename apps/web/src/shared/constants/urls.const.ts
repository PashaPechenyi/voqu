export const HOME_URL = '/';
export const ABOUT_URL = '/about';
export const ADMIN_URL = '/admin';
export const ADMIN_COURSES_URL = `${ADMIN_URL}/courses`;
export const ADMIN_COURSES_EDIT_URL = (id: string) => {
  return `${ADMIN_COURSES_URL}/edit/${id}`;
};
