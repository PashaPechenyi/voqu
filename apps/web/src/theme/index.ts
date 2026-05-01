import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#71677D',
    },
    secondary: {
      main: '#37123c',
    },
    background: {
      default: '#ebebeb',
    },
    tertiary: {
      main: '#aa9f96',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600, color: '#37123c' },
    h4: { fontSize: '28px', fontWeight: 500, color: '#37123c' },

    h5: {
      fontSize: 20,
      '@media (min-width:700px)': {
        fontSize: 24,
      },
      '@media (min-width:900px)': {
        fontSize: 30,
      },
    },

    h6: {
      fontSize: 17,
      '@media (min-width:700px)': {
        fontSize: 21,
      },
      '@media (min-width:900px)': {
        fontSize: 26,
      },
    },
    body2: {},
    // FIXME: fix type
    body3: {
      fontSize: 21,
      color: '#37123c',
    },
    body4: {
      fontSize: 11,
      color: '#aa9f96',
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
