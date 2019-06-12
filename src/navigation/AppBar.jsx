import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Menu, Tabs, Tab
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from "react-router-dom";
import { VisitorMenu, JSMenu } from './AppBarMenus';
import { useWindowDimensions, decodeToken } from '../modules';

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

function NavTab(props) {
  const classes = useStyles();
  return (
    <Tab
      component={Link}
      {...props}
      className={classes.linkItems}
    />
  );
}

function ProAssistAppBar(props) {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const [page, setPage] = React.useState(false);
  const [userType, setMenu] = React.useState('Visitor');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

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

      if (!decodeToken()) {
        setMenu('Visitor');
        return;
      }

      const { userType } = decodeToken();
      setMenu(userType);
    }

    setInitialPage(props.history.location);

    const unlisten = props.history.listen(setInitialPage);

    return () => unlisten();
  }, [props.history]);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  let menu;
  switch (userType) {
    case 'Company':
    case 'JobSeeker':
      menu = JSMenu(closeMenu);
      break;
    default:
      menu = VisitorMenu(closeMenu);
      break;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.linkItems}>ProAssist</Link>
        </Typography>

        <Tabs className={classes.navTab} value={page} hidden={mobileView}>
          <NavTab label="Home" to="/" />
          <NavTab label="About" to="/about" />
          <NavTab label="Careers" to="/careers" />
        </Tabs>

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
          {menu}
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
