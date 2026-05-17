import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function SectionDivider() {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.line} />
      <Box sx={sxStyles.diamond} />
      <Box sx={sxStyles.line} />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    width: '50%',
    margin: 'auto',
    my: 2.5,
  },
  line: {
    flex: 1,
    height: '1px',
    bgcolor: 'secondary.dark',
  },
  diamond: {
    width: '8px',
    height: '8px',
    bgcolor: 'secondary.dark',
    transform: 'rotate(45deg)',
  },
});

export default SectionDivider;
