// TODO: `Box` is imported but never used. Remove unused import.
// TODO: `<Button href={ADMIN_COURSES_URL}>` causes a full page reload; use react-router's `<Link>` or `useNavigate()` so SPA state is preserved.
// TODO: Better UX: use the browser's `navigate(-1)` to actually "go back" — the current button always goes to `/admin/courses` even when the user came from another origin.
// TODO: `export const` style here; some other sections use `export default`. Standardize.
import { Box, Button, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
export const GoBackSection = () => {
  return (
    <Button sx={{ marginBottom: 5 }} href={ADMIN_COURSES_URL}>
      <KeyboardBackspaceIcon />
      <Typography ml={2}>Back to Courses</Typography>
    </Button>
  );
};
