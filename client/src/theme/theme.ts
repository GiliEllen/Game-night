import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#BCECE5',
    },
    secondary: {
      main: '#9877A9',
    },
    error: {
      main: "#ba1a1a"
    }
  },
};

export const theme = createTheme(themeOptions)