import { ThemeProvider } from '@emotion/react';
import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { theme } from '@/theme';

function AdminLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f6f1ee',
        }}
      >
        <AdminHeader />
        <Container component="main" sx={{ flex: 1, py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLayout;
