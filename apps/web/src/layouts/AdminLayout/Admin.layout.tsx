import { Outlet } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';
import AdminHeader from './components/AdminHeader';

function AdminLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminHeader />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  );
}

export default AdminLayout;
