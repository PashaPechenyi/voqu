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
