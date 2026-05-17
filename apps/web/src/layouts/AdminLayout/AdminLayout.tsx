import { FC } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const AdminLayout: FC = () => {
  return (
    <Box sx={sxStyles.root}>
      <AdminHeader />
      <Container component="main" sx={sxStyles.content}>
        <Outlet />
      </Container>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: (theme) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  }),
  content: {
    flex: 1,
    py: 4,
  },
});

export default AdminLayout;
