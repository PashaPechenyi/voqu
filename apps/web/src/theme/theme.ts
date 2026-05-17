import { createTheme } from '@mui/material/styles';
import './theme.declaration';

const COLORS = {
  secondary: '#37123c',
  tertiary: '#aa9f96',
};

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#71677D',
    },
    secondary: {
      main: COLORS.secondary,
    },
    background: {
      default: '#ebebeb',
      paper: '#f6f1ee',
    },
    tertiary: {
      main: COLORS.tertiary,
    },
    divider: '#9e9e9e',
  },
});

export const theme = createTheme(baseTheme, {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600, color: COLORS.secondary },
    h4: { fontSize: '28px', fontWeight: 500, color: COLORS.secondary },
    h5: {
      fontSize: 20,
      [baseTheme.breakpoints.up('sm')]: { fontSize: 24 },
      [baseTheme.breakpoints.up('md')]: { fontSize: 30 },
    },
    h6: {
      fontSize: 17,
      [baseTheme.breakpoints.up('sm')]: { fontSize: 21 },
      [baseTheme.breakpoints.up('md')]: { fontSize: 26 },
    },
    body3: {
      fontSize: 21,
      color: COLORS.secondary,
    },
    body4: {
      fontSize: 11,
      color: COLORS.tertiary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingRight: 0,
          paddingLeft: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
