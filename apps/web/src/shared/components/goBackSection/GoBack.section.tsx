import { Button, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
type GoBackSectionProps = {
  url: string;
};
function GoBackSection({ url }: GoBackSectionProps) {
  return (
    <Button sx={{ marginBottom: 5 }} href={url}>
      <KeyboardBackspaceIcon />
      <Typography ml={2}>Back to Courses</Typography>
    </Button>
  );
}

export default GoBackSection;
