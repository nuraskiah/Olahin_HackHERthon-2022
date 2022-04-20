import { createTheme } from '@mui/material/styles';
import { primary } from './color';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: primary.main,
    },
    secondary: {
      main: '#d84315',
    },
    success: {
      main: '#c0ca33',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        outlinedSecondary: {
          color: 'white',
          borderColor: 'white',
        },
      },
    },
  },
});

export default theme;
