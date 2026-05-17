// TODO: AdminLayout has no auth guard / role check. Anyone hitting `/admin` sees the page. Wrap children with a `<RequireAdmin>` (or guard in the router) before the project goes live.
// TODO: `Toolbar` placed inside the main `Container` is a workaround for the fixed `<AppBar>`; either use MUI's `theme.mixins.toolbar` spacer or position the header non-fixed.
// TODO: This file is almost identical to `PublicLayout/Public.layout.tsx` — extract a shared `BaseLayout` that accepts `<Header>`/`<Footer>` slots.
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
