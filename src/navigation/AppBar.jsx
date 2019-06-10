import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
<<<<<<< HEAD:src/AppBar.jsx
  AppBar, Toolbar, Typography, IconButton, Menu, Tab, Tabs
=======
  AppBar, Toolbar, Typography, IconButton, Menu, Tabs, Tab
>>>>>>> bridges:src/navigation/AppBar.jsx
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from "react-router-dom";
import VisitorMenu from './VisitorMenu';
<<<<<<< HEAD:src/AppBar.jsx
import useWindowDimensions from './modules/useWindowDimensions';
import { NavLink } from 'react-router-dom'
=======
import { useWindowDimensions } from '../modules';
>>>>>>> bridges:src/navigation/AppBar.jsx

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  linkItems: {
    '&:hover': {
      color: 'inherit'
    },
    color: 'inherit'
  }
}));

<<<<<<< HEAD:src/AppBar.jsx
function NavLinkTab(props) {
  return (
    <Tab
      component={NavLink}
      {...props}
      />
=======
function NavTab(props) {
  const classes = useStyles();
  return (
    <Tab
      component={Link}
      {...props}
      className={classes.linkItems}
    />
>>>>>>> bridges:src/navigation/AppBar.jsx
  );
}

function ProAssistAppBar(props) {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const [page, setPage] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

<<<<<<< HEAD:src/AppBar.jsx
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

=======
  React.useEffect(() => {
    function setInitialPage(location) {
      let initialPage = false;

      switch (location.pathname) {
        case '/':
          initialPage = 0;
          break;
        case '/about':
          initialPage = 1;
          break;
        case '/careers':
          initialPage = 2;
          break;
        default:
          initialPage = false;
          break;
      }

      setPage(initialPage);
    }

    setInitialPage(props.history.location);

    props.history.listen(setInitialPage);
  }, [props.history]);
>>>>>>> bridges:src/navigation/AppBar.jsx

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.linkItems}>ProAssist</Link>
        </Typography>

<<<<<<< HEAD:src/AppBar.jsx
        <Typography
          variant="subtitle1"
          hidden={mobileView}
          className={classes.menuItem}
        >
          <Link to="/test" className={classes.linkItems}>Test</Link>
        </Typography>
        <Tabs className={classes.tabsDesktop} value={value} onChange={handleChange}>
            <NavLinkTab label="Main" to="/" />
            <NavLinkTab label="About" to="/about" />
            <NavLinkTab label="Careers" to="/careers" />
            <NavLinkTab label="Login" to="/login" />
            <NavLinkTab label="Registration" to="/register" />
          </Tabs> 
=======
        <Tabs className={classes.navTab} value={page} hidden={mobileView}>
          <NavTab label="Home" to="/" />
          <NavTab label="About" to="/about" />
          <NavTab label="Careers" to="/careers" />
        </Tabs>

>>>>>>> bridges:src/navigation/AppBar.jsx
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          color="inherit"
          hidden={mobileView}
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
        >
          {VisitorMenu(closeMenu)}
        </Menu>

        <IconButton
          color="inherit"
          hidden={!mobileView}
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(ProAssistAppBar);
