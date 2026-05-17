// TODO: Function has no return-type annotation. Define a response interface (or import it from a shared types file) and annotate.
// TODO: `try/catch` with empty catch swallows errors — let the caller decide. At minimum, `throw` it.
// TODO: `console.log(result, 'result')` left in production code — remove.
// TODO: All `/api/...` calls in this project are scattered `fetch(...)` calls. Build a small `apiClient` helper (or use `fetch` with a wrapper) that sets `Content-Type`, parses JSON, throws on non-2xx, and types the response. Then `getCourses`, `getLevels`, `useEditCourse` and `EditCoursePage` can share it.
// TODO: URLs are hardcoded strings. Centralize as `API_COURSES = '/api/course'` (in a new `shared/constants/apiUrls.const.ts`).
// TODO: `default export` of arrow functions makes refactors harder. Prefer named exports throughout helpers/.
const getCourses = async () => {
  try {
    const response = await fetch('/api/course', {
      method: 'GET',
    });
    //console.log(response);
    if (!response.ok) {
      throw new Error('Something went wrong...');
    }
    const result = await response.json();
    console.log(result, 'result');
    return result;
  } catch (error) {}
};

export default getCourses;
