import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';

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
      <p>Hi</p>
      <Footer />
    </div>
  );
}

export default App;
