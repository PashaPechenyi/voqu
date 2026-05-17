// TODO: File name suffix `.consts.ts` is inconsistent — every other constants file uses `.const.ts` (singular). Rename to `validationErrors.const.ts`.
// TODO: Only a single key is defined. As soon as the form set grows you will need email/min-length/url validators — define them here in advance, since right now `addCourse` will accept any string as an image URL.
export const VALIDATION_ERRORS = {
  REQUIRED: 'This field is required!',
};
