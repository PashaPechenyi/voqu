import { createTheme } from '@mui/material/styles';

const COLORS = {
  primary: '#71677C',
  secondary: '#F5F1ED',
  adminPrimary: '#37123C',
  adminSecondary: '#A99F96',
  tertiary: '#AA9F96',
};

export const theme = createTheme({
  palette: {
    primary: { main: COLORS.primary },
    secondary: { main: COLORS.secondary },
    adminPrimary: { main: COLORS.adminPrimary },
    adminSecondary: { main: COLORS.adminSecondary },
    background: { default: COLORS.secondary },
    text: {
      primary: COLORS.adminPrimary,
      secondary: COLORS.secondary,
    },
    tertiary: { main: COLORS.tertiary },
  },
  typography: {
    fontFamily: '"Georgia", "Times New Roman", serif',
    h1: { fontWeight: 700 },
    h2: {
      fontWeight: 600,
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
      fontSize: 24,
      '@media (min-width:600px)': {
        fontSize: 32,
      },
      '@media (min-width:900px)': {
        fontSize: 48,
      },
    },
    h4: {
      fontWeight: 400,
      fontSize: 24,
      '@media (min-width:600px)': {
        fontSize: 25,
      },
      '@media (min-width:900px)': {
        fontSize: 34,
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
