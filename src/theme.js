import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#666666',
      main: '#3c3c3c',
      dark: '#161616',
      contrastText: '#fff',
    },
    secondary: {
      light: '#bc402e',
      main: '#850505',
      dark: '#530000',
      contrastText: '#fff',
    },
  },
});

export default theme;