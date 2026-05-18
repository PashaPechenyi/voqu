import { FC } from 'react';
import { Box } from '@mui/material';
import diamondIcon from '@/assets/images/diamond.png';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const SectionDivider: FC = () => {
  return (
    <Box sx={sxStyles.container}>
      <Box sx={sxStyles.line} />
      <Box component="img" src={diamondIcon} alt="" sx={sxStyles.icon} />
      <Box sx={sxStyles.line} />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  container: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    margin: '0 auto',
    mt: '60px',
    width: '200px',
    flexDirection: { xs: 'column', md: 'row' },
  },
  line: (theme) => ({
    width: '50%',
    height: '1.5px',
    backgroundColor: theme.palette.tertiary.main,
  }),
  icon: { width: '13px' },
});

export default SectionDivider;
