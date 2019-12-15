import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Menu, Tabs, Tab
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import { VisitorMenu, JSMenu } from './AppBarMenus';
import { useWindowDimensions, useToken } from '../hooks';
import { logo_white } from '../img';

const useStyles = makeStyles(() => ({
  linkItems: {
    "&:hover": {
      border: "1px solid white"
    },
    color: "inherit"
  },
  logo: {
    height: 58
  },
  toolbarContainer: {
    maxHeight: 64,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
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
  const { userType } = useToken();

  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const [page, setPage] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  React.useEffect(() => {
    function setInitialPage(location) {
      let initialPage = false;

      switch (location.pathname) {
        case '/':
          initialPage = 0;
          break;
        // case '/about':
        //   initialPage = 1;
        //   break;
        case '/careers':
          initialPage = 1;
          break;
        default:
          initialPage = false;
          break;
      }

      setPage(initialPage);
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
    case 'Admin':
      menu = JSMenu(closeMenu);
      break;
    default:
      menu = VisitorMenu(closeMenu);
      break;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.toolbarContainer}>
          <Link to="/" className={classes.linkItems}>
            <img src={logo_white} alt="logo" className={classes.logo} />
          </Link>

          <div className={classes.navigation}>
            <Tabs className={classes.navTab} value={page} hidden={mobileView}>
              <NavTab label="Home" to="/" />
              {/* <NavTab label="About" to="/about" /> */}
              <NavTab label="Careers" to="/careers" />
            </Tabs>

            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
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
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(ProAssistAppBar);
