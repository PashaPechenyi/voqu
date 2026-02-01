import { Outlet } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

export function PublicLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicHeader />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Toolbar />
        <Outlet />
      </Container>
      <PublicFooter />
    </Box>
  );
}
