import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ce4735',
      main: '#960d0d',
      dark: '#620000',
      contrastText: '#fff'
    },
    typography: {
      fontFamily: [
        '"Noto Sans HK"',
        'Lato',
        'Roboto',
        'sans-serif'
      ].join(','),
      suppressWarning: true
    },
  },
});

export default theme;