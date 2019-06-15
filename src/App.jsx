import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import Splashpage from './components/Splashpage';
import About from './components/About';
import Careers from './components/CareersExpansion';
import Registration from './components/Registration';
// import LogIn from './LogIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Drawer, Footer } from './navigation';
import { Login, FileTests } from './pages';
import { PdfViewer, FileUpload } from './components';
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
      <BrowserRouter>
        <AppBar toggleDrawer={toggleDrawer} />
        <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
        
        <Switch>
          <Route exact path="/" component={Splashpage} />
          <Route path="/about" component={About} />
          <Route path="/careers" component={Careers} />
          {/* <Route path="/login" component={LogIn} /> */}
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/files" component={FileTests} />
        </Switch>

        <Footer />
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
