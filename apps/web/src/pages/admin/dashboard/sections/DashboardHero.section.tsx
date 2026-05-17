// TODO: Welcome text says "Welcome back!" — placeholder. Use the actual user name from Auth0 once wired (`useAuth0().user.name`).
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
