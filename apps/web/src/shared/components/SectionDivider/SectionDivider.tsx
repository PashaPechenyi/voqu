import { Box } from '@mui/material';
import icon from '@/assets/images/diamond.png';

function SectionDivider() {
  return (
    <Box sx={styles.container}>
      <Box sx={{ width: '50%', height: '1.5px', backgroundColor: '#AA9F96' }}></Box>
      <Box component="img" src={icon} sx={{ width: '13px' }}></Box>
      <Box sx={{ width: '50%', height: '1.5px', backgroundColor: '#AA9F96' }}></Box>
    </Box>
  );
}
const styles = {
  container: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    margin: '0 auto',
    mt: '60px',
    width: '200px',
    flexDirection: { xs: 'column', md: 'row' },
  },
};

export default SectionDivider;
