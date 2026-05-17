// TODO: Mostly identical to `AdminLayout/Admin.layout.tsx` — share via a `BaseLayout` with optional header/footer slot props.
import { Outlet } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';
import PublicHeader from './components/PublicHeader';
import PublicFooter from './components/PublicFooter';

function PublicLayout() {
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

export default PublicLayout;
