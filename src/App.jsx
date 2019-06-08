import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';
import Splashpage from './Splashpage';

const useStyles = makeStyles(theme => ({
  app: {
    position: 'relative',
    minHeight: '100vh'
  }
}));

function App() {
  const classes = useStyles();

  const [openDrawer, setDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <div className={classes.app}>
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
      <Splashpage />
      <Footer />
    </div>
  );
}

export default App;
