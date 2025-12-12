# Phase 1.1: Shared Components

> **Parent document:** [Phase 1.1 - Public Pages](./phase-1.1-public-pages.md)
>
> **Status:** Planning
>
> **Scope:** Layout components, common UI elements, theme configuration, and dependencies shared across public pages.

---

## Overview

This document covers shared components and configurations used by both Landing Page (1.1.a) and About Page (1.1.b).

---

## File Structure

```
apps/web/src/
├── components/
│   ├── layout/
│   │   ├── PublicLayout.tsx         # Layout wrapper for public pages
│   │   ├── PublicHeader.tsx         # Navigation header
│   │   └── PublicFooter.tsx         # Footer with links
│   └── common/
│       └── Logo.tsx                 # App logo component
├── theme/
│   └── index.ts                     # MUI theme configuration
├── routes/
│   └── index.tsx                    # Route definitions
└── main.tsx                         # App entry point with providers
```

---

## Layout Components

### Public Layout

**Purpose:** Wrapper component providing consistent header/footer for all public pages.

```tsx
// apps/web/src/components/layout/PublicLayout.tsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

export const PublicLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PublicHeader />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <PublicFooter />
    </Box>
  );
};
```

---

### Public Header

**Purpose:** Responsive navigation header with mobile drawer.

**Navigation Items (Ukrainian):**
- Головна → `/`
- Про нас → `/about`
- Увійти → `/auth/login`
- Реєстрація → `/auth/signup`

```tsx
// apps/web/src/components/layout/PublicHeader.tsx
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';

const navItems = [
  { label: 'Головна', path: '/' },
  { label: 'Про нас', path: '/about' },
];

export const PublicHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo />
          </Link>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                onClick={() => setDrawerOpen(true)}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250, pt: 2 }}>
                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(item.path);
                            setDrawerOpen(false);
                          }}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate('/auth/login');
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemText primary="Увійти" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ px: 2, pt: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          navigate('/auth/signup');
                          setDrawerOpen(false);
                        }}
                      >
                        Реєстрація
                      </Button>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                color="inherit"
                onClick={() => navigate('/auth/login')}
              >
                Увійти
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/auth/signup')}
              >
                Реєстрація
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
```

---

### Public Footer

**Purpose:** Footer with navigation links and copyright.

**Footer Links (Ukrainian):**
- Про нас → `/about`
- Контакти → `/contact`
- Політика конфіденційності → `/privacy`

```tsx
// apps/web/src/components/layout/PublicFooter.tsx
import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Про нас', path: '/about' },
  { label: 'Контакти', path: '/contact' },
  { label: 'Політика конфіденційності', path: '/privacy' },
];

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: 'grey.100',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Voqu. Всі права захищено.
          </Typography>

          <Stack direction="row" spacing={3}>
            {footerLinks.map((link) => (
              <MuiLink
                key={link.path}
                component={Link}
                to={link.path}
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                {link.label}
              </MuiLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
```

---

## Common Components

### Logo Component

**Purpose:** Reusable logo with configurable sizes.

```tsx
// apps/web/src/components/common/Logo.tsx
import { Typography, Stack } from '@mui/material';
import { School } from '@mui/icons-material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo = ({ size = 'medium' }: LogoProps) => {
  const sizes = {
    small: { icon: 24, text: '1.25rem' },
    medium: { icon: 32, text: '1.5rem' },
    large: { icon: 48, text: '2rem' },
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <School sx={{ fontSize: sizes[size].icon, color: 'primary.main' }} />
      <Typography
        variant="h6"
        sx={{
          fontSize: sizes[size].text,
          fontWeight: 700,
          color: 'primary.main',
        }}
      >
        Voqu
      </Typography>
    </Stack>
  );
};
```

---

## Theme Configuration

**Purpose:** Centralized MUI theme with brand colors, typography, and component overrides.

```tsx
// apps/web/src/theme/index.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',       // Blue
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed',       // Purple
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});
```

---

## Routes Configuration

```tsx
// apps/web/src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { LandingPage } from '@/pages/public/LandingPage';
import { AboutPage } from '@/pages/public/AboutPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);
```

---

## App Entry Point

```tsx
// apps/web/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
```

---

## Dependencies

**Required npm packages for Phase 1.1:**

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.0",
    "@mui/lab": "^5.0.0-alpha.170",
    "@mui/material": "^5.14.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^2.0.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

**Installation:**
```bash
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/lab react-router-dom react-helmet-async
```

---

## Implementation Checklist

- [ ] Set up MUI theme configuration (`theme/index.ts`)
- [ ] Create `PublicLayout` component
- [ ] Create `PublicHeader` with responsive navigation
- [ ] Create `PublicFooter`
- [ ] Create `Logo` component
- [ ] Configure routes (`routes/index.tsx`)
- [ ] Set up app entry point with providers (`main.tsx`)
- [ ] Install all required dependencies
- [ ] Test responsive header/footer on all breakpoints
