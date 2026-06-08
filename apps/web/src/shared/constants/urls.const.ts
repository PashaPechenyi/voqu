export const HOME_URL = '/';
export const ABOUT_URL = '/about';
export const CONTACT_URL = '/contact';
export const PRIVACY_URL = '/privacy';
export const ADMIN_URL = '/admin';
export const ADMIN_COURSES_URL = `${ADMIN_URL}/courses`;
export const ADMIN_USERS_URL = `${ADMIN_URL}/users`;
export const ADMIN_COURSES_UPDATE_URL = (id: string) => `${ADMIN_COURSES_URL}/update/${id}`;
