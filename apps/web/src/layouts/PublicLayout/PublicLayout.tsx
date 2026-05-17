import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const PublicLayout: FC = () => {
  return (
    <Box sx={sxStyles.root}>
      <PublicHeader />
      <Container component="main" sx={sxStyles.content}>
        <Outlet />
      </Container>
      <PublicFooter />
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

export default PublicLayout;
