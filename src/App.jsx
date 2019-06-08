import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppBar from './AppBar';
import Main from './components/Main';
import About from './components/About';
import Careers from './components/Careers';
import Registration from './components/Registration';
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
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Registration} />
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
