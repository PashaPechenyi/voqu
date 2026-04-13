import { Box } from '@mui/material';

function SectionDivider() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '50%',
        margin: 'auto',
        my: 2.5,
      }}
    >
      <Box sx={{ flex: 1, height: '1px', bgcolor: 'secondary.dark' }} />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: 'secondary.dark',
          transform: 'rotate(45deg)',
        }}
      />
      <Box sx={{ flex: 1, height: '1px', bgcolor: 'secondary.dark' }} />
    </Box>
  );
}

export default SectionDivider;
