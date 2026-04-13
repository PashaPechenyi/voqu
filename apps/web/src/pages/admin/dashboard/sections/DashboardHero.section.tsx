import { Box, Typography } from '@mui/material';

function DashboardHeroSection() {
  return (
    <Box mb={10}>
      <Typography variant="h2">Admin Dashboard</Typography>
      <Typography variant="h6" color={'primary'}>
        Welcome back! Here's what's happening with Voqu today.
      </Typography>
    </Box>
  );
}

export default DashboardHeroSection;
