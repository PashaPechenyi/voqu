// TODO: `ADMIN_COURSES_EDIT_URL(':courseId')` mixes two responsibilities: building a real URL with an id AND building a route pattern with `:courseId`. Split into two: a `ADMIN_COURSES_EDIT_ROUTE` static string with `:courseId` placeholder and a `buildAdminCoursesEditUrl(id)` builder, so routing and navigation share the same source.
// TODO: Missing URLs that are hardcoded in components: `/contact`, `/privacy`, `/table` (used in adminNavItems and publicNavItems). Add them as constants and remove the hardcoded paths.
// TODO: File name uses singular `.const.ts` but `validationErrors.consts.ts` uses plural `.consts.ts` (s). Decide on one suffix and rename across the codebase.
export const HOME_URL = '/';
export const ABOUT_URL = '/about';
export const ADMIN_URL = '/admin';
export const ADMIN_COURSES_URL = `${ADMIN_URL}/courses`;
export const ADMIN_COURSES_EDIT_URL = (id: string) => {
  return `${ADMIN_COURSES_URL}/edit/${id}`;
};
