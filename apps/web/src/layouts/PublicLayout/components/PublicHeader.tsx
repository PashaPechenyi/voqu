// TODO: `useMediaQuery(theme.breakpoints.down('sm'))` imports the `theme` object from `@/theme` and passes it explicitly. Use the `useTheme()` hook (MUI) so the component pulls the theme from context — this is the React-idiomatic way and lets the layout work with any ThemeProvider.
// TODO: Two large duplicated `<AppBar>/<Toolbar>` blocks (mobile vs desktop). Render one tree with responsive `sx={{ display: { xs: ..., sm: ... } }}` to avoid the duplication.
// TODO: `'Sing up'` is misspelled — should be `'Sign up'`. (Also duplicated in `PublicMobileMenu.tsx`.)
// TODO: `href={btn.path}` triggers a full-page reload; switch to react-router `<Link>` for SPA navigation.
// TODO: Login / Sign-up buttons have no handlers wired in yet; clicking them does nothing.
// TODO: `<Button key={index}>` — use `btn.path` as the key.
// TODO: Hardcoded `Voqu` logo+text — extract `<BrandLogo />` shared component (used in 3 places).
import { useState } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import { publicNavItems } from '../constants/publicNavItems.const';
import { theme } from '@/theme';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import PublicMobileMenu from './PublicMobileMenu';

function PublicHeader() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {isMobile ? (
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <PublicMobileMenu open={open} toggleDrawer={toggleDrawer} />
            <Box sx={sxStyles.logoBox}>
              <IconButton>
                <SchoolIcon color="secondary" />
              </IconButton>
              <Typography color={'textSecondary'} variant="h6">
                Voqu
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar>
          <Toolbar sx={sxStyles.toolbarDesktop}>
            <Box sx={sxStyles.logoBox}>
              <IconButton>
                <SchoolIcon color="secondary" />
              </IconButton>
              <Typography color={'textSecondary'} variant="h6">
                Voqu
              </Typography>
            </Box>

            <Box>
              {publicNavItems.map((btn, index) => {
                return (
                  <Button key={index} href={btn.path} color="inherit">
                    <Typography color={'textSecondary'}>{btn.label}</Typography>
                  </Button>
                );
              })}
            </Box>
            <Box>
              <Button variant="outlined" color="inherit" sx={{ mr: 2 }}>
                <Typography color={'textSecondary'}>Log in</Typography>
              </Button>
              <Button variant="contained" color="inherit">
                <Typography color={'textPrimary'}>Sing up</Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
const sxStyles = createSxStylesList({
  logoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarDesktop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default PublicHeader;
