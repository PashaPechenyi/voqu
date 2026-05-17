// TODO: Inline `sx` block here mixes random raw values (`'8px'`, `'1px'`, `2.5`) — extract to `createSxStylesList` for consistency with the rest of the project.
// TODO: This component has no props but its width/colors are hardcoded. Expose `width`, `color`, and `iconSize` props so it can be reused on dark backgrounds and different sections.
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
