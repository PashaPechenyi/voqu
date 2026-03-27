import { Outlet } from 'react-router-dom';
import { Box, Container, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

export function PublicLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor:'#f6f1ee' }}>
        <PublicHeader />
        <Container component="main" sx={{ flex: 1, py: 4, }}>
          <Outlet />
        </Container>
        <PublicFooter />
      </Box>
    </ThemeProvider>
  );
}
