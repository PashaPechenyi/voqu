// TODO: Auth0 is a project dependency (per package.json) but no `Auth0Provider` is set up here. Wrap `<App />` in `<Auth0Provider>` once auth is wired in.
// TODO: No global error boundary. Add a top-level `<ErrorBoundary>` so a render error in any page doesn't blank the whole app.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
