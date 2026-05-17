import { createTheme } from '@mui/material/styles';

// TODO: Magic hex colors (`#71677C`, `#F5F1ED`, `#37123C`, `#A99F96`) should be extracted into named constants at the top of the file — they are reused across the project (e.g. `lessonTypeColors`, sx blocks) and must be the single source of truth.
// TODO: `text.secondary: '#f5f1ed'` is white-on-light — invisible on the default background. Looks like a bug.
// TODO: Typography breakpoints are inlined for h2/h3/h4/h5 via `@media (min-width:600px)` strings. Use `theme.breakpoints.up('sm')` style consistently to share breakpoint definitions.
// TODO: Font sizes mix `number` (15, 24, 35) and `string` ('24px', '32px') — pick one (numbers are recommended by MUI).
// TODO: `fontFamily: '"Georgia", "Times New Roman", sans-serif'` — Georgia/Times are serif fonts; the fallback should be `serif`, not `sans-serif`.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#71677C',
    },
    secondary: {
      main: '#F5F1ED',
    },
    adminPrimary: {
      main: '#37123C',
    },
    adminSecondary: {
      main: '#A99F96',
    },
    background: {
      default: '#F5F1ED',
    },
    text: {
      primary: '#37123C',
      secondary: '#f5f1ed',
    },
    tertiary: {
      main: '#aa9f96',
    },
  },
  typography: {
    fontFamily: '"Georgia", "Times New Roman", sans-serif',
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
      fontSize: '24px',
      '@media (min-width:600px)': {
        fontSize: '32px',
      },
      '@media (min-width:900px)': {
        fontSize: '48px',
      },
    },
    h4: {
      fontWeight: 400,
      fontSize: '24px',
      '@media (min-width:600px)': {
        fontSize: '25px',
      },
      '@media (min-width:900px)': {
        fontSize: '34px',
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
