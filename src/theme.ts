import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2551AA',
    },
    secondary: {
      main: '#208439',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
