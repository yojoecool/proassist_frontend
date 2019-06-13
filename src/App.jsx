import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Drawer, Footer } from './navigation';
import { Login, Profile } from './pages';
import { history } from './modules';
import './App.css';

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
      <Router history={history}>
        <AppBar toggleDrawer={toggleDrawer} />
        <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
        
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>

        <Footer />
      </Router>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
