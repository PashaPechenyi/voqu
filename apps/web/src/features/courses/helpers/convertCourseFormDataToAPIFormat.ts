// TODO: No return-type annotation. Define `CreateCoursePayload` and use it as the return type so the API contract is explicit.
// TODO: `LevelId: String(data.level?.id)` — converting a numeric id to a string is suspicious. Either the backend expects a number (then drop `String(...)`) or the backend expects a string id (then `data.level?.id` should already be a string). Check the backend contract.
// TODO: `data.status?.toLowerCase()` — `status` is an enum, its values are already lowercase strings. The call is redundant; just pass `data.status`.
// TODO: When `data.level` is `null` (no level chosen), `String(undefined)` → `'undefined'` is sent to the API. Validate that `level` is required before submission, then the optional-chaining can disappear.
// TODO: Helper file name is fine but exports a function whose name (`convertCourseFormDataToAPIFormat`) is unidiomatic — prefer `toCreateCoursePayload` or `mapCourseFormToApi`. Keep the file name and function name aligned.
import { CourseFormValues } from '../types/courseFormValues.type';

export const convertCourseFormDataToAPIFormat = (data: CourseFormValues) => {
  return {
    name: data.title,
    description: data.description,
    status: data.status?.toLowerCase(),
    LevelId: String(data.level?.id),
  };
};
