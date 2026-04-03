import { Box, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
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
