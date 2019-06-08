import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';
import LogIn from './LogIn';

const useStyles = makeStyles(theme => ({
  app: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: 215
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
      <BrowserRouter>
        <AppBar toggleDrawer={toggleDrawer} />
        <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
        
        <Switch>
          <Route path="/login" component={LogIn} />
        </Switch>

        <Footer />
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
