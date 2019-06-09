import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, MenuItem, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons'
import classNames from 'classnames';
import { useWindowDimensions } from '../modules';

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: '75vw'
  },
  tabletDrawer: {
    width: '50vw'
  },
  fullHeight: {
    height: '100vh'
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold'
  },
  topDiv: {
    height: '8%',
    padding: 10
  },
  pathDiv: {
    height: 20,
    width: 7,
    marginRight: 5
  },
  currentPath: {
    backgroundColor: theme.palette.secondary.main,
  }
}));

function MenuLink(props) {
  const classes = useStyles();

  return (
    <MenuItem
      component={Link}
      {...props}
    >
      <div
        className={classNames(classes.pathDiv,
          { [classes.currentPath]: !!props.curr }
        )}
      />
      {props.children}
    </MenuItem>
  );
}

function VisitorMenu(props) {
  return (
    <React.Fragment>
      <MenuLink
        onClick={props.onClick}
        to="/login"
        curr={props.page === 3 ? 1 : 0}
      >
        Login
      </MenuLink>
      <MenuLink
        onClick={props.onClick}
        to="/register"
        curr={props.page === 4 ? 1 : 0}
      >
        Register
      </MenuLink>
    </React.Fragment>
  );
}

function ProAssistDrawer(props) {
  const { width } = useWindowDimensions();
  const mobileView = width <= 425;
  const tabletView = width > 425 && width <= 768;

  const [page, setPage] = React.useState(-1);

  const classes = useStyles();
  let classToUse = classes.tabletDrawer;

  if (!mobileView && !tabletView) {
    props.closeDrawer();
  } else if (mobileView) {
    classToUse = classes.mobileDrawer;
  }

  React.useEffect(() => {
    function setInitialPage(location) {
      let initialPage = -1;

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
        case '/login':
          initialPage = 3;
          break;
        case '/register':
          initialPage = 4;
          break;
        default:
          initialPage = -1;
          break;
      }

      setPage(initialPage);
    }

    setInitialPage(props.history.location);

    props.history.listen(setInitialPage);
  }, [props.history]);

  return (
    <Drawer
      anchor="right"
      open={props.openDrawer}
      onClose={props.closeDrawer}
    >
      <div
        className={classNames(classToUse, classes.drawer, classes.fullHeight)}
      >
        <div className={classNames(classes.topDiv, 'd-flex', 'justify-content-end', 'align-items-center')}>
          <IconButton
            color="inherit"
            onClick={props.closeDrawer}
          >
            <Close />
          </IconButton>
        </div>

        <MenuLink
          onClick={props.closeDrawer}
          to="/"
          curr={page === 0 ? 1 : 0}
        >
          Home
        </MenuLink>
        <MenuLink
          onClick={props.closeDrawer}
          to="/about"
          curr={page === 1 ? 1 : 0}
        >
          About
        </MenuLink>
        <MenuLink
          onClick={props.closeDrawer}
          to="/careers"
          curr={page === 2 ? 1 : 0}
        >
          Careers
        </MenuLink>
        <VisitorMenu onClick={props.closeDrawer} page={page} />
      </div>
    </Drawer>
  );
}

export default withRouter(ProAssistDrawer);