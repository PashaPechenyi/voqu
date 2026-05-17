// TODO: Imports `Course` from `pages/admin/adminCourses/types/course.type` — a feature hook must NOT depend on a page-local type. Move/merge `Course` to `features/courses/types/course.type.ts` and import from there.
// TODO: Inline `fetch` should live in `features/courses/helpers/updateCourse.ts`; the hook should compose the helper. Pattern matches `useGetCourses` → `helpers/getCourses`.
// TODO: `body: JSON.stringify(data)` sends raw `CourseFormValues` (with `level` as full object and `status` enum). The backend likely expects the converted shape — call `convertCourseFormDataToAPIFormat(data)` (the same helper used by `AddCourseModal`).
// TODO: `try { ... } catch (error) {}` silently swallows errors. Propagate to a global error toaster or expose an `error` state from the hook.
// TODO: `//console.log(result, 'byid');` — delete commented-out logs.
// TODO: Default-export naming: `useEditCourse` is fine, but other hook files mix default vs named exports. Pick one convention.
// TODO: Default-exports a hook with no parameters of its own state (`isLoading`, `error`); add them so the UI can show loading/error indicators.
// TODO: `result.course` shape is assumed; type the fetch response and verify.
import { Course } from '@/pages/admin/adminCourses/types/course.type';
import { CourseFormValues } from '../types/courseFormValues.type';

type UseEditCourseProps = {
  onSuccess?: (data: Course) => void;
};

const useEditCourse = ({ onSuccess }: UseEditCourseProps) => {
  const updateCourseById = async (courseId: Course['id'], data: CourseFormValues) => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }

      const result = await response.json();

      //console.log(result, 'byid');
      onSuccess?.(result.course);
    } catch (error) {}
  };

  return { updateCourseById };
};

export default useEditCourse;
