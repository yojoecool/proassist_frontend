import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main';
import About from './components/About';
import Careers from './components/Careers';
import Login from './components/Login';
import Registration from './components/Registration';
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
      <BrowserRouter>
        <AppBar toggleDrawer={toggleDrawer} />
        <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
        <Route exact path="/" component={Main} />
        <Route path="/about" component={About} />
        <Route path="/careers" component={Careers} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
