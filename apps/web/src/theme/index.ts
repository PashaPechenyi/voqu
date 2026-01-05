import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#71677C',
    },
    secondary: {
      main: '#F5F1ED',
    },
    background: {
      default: '#F5F1ED',
    },
    text: {
      primary: '#37123C',
      secondary: '#f5f1ed',
    },
  },
  typography: {
    fontFamily: '"Georgia", "Times New Roman", sans-serif',
    h1: { fontWeight: 700 },
    h2: {
      fontWeight: 700,
      fontSize: 35,
      '@media (min-width:600px)': {
        fontSize: 60,
      },
      '@media (min-width:900px)': {
        fontSize: 90,
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: 15,
      '@media (min-width:600px)': {
        fontSize: 24,
      },
      '@media (min-width:900px)': {
        fontSize: 30,
      },
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
