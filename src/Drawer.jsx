import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, MenuItem, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons'
import classNames from 'classnames';
import VisitorMenu from './VisitorMenu';
import useWindowDimensions from './modules/useWindowDimensions';

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
  }
}));

function MenuLink(props) {
  return (
    <MenuItem
      component={Link}
      {...props}
    >
      {props.children}
    </MenuItem>
  );
}

function ProAssistDrawer(props) {
  const { width } = useWindowDimensions();
  const mobileView = width <= 425;
  const tabletView = width > 425 && width <= 768;

  const classes = useStyles();
  let classToUse = classes.tabletDrawer;

  if (!mobileView && !tabletView) {
    props.closeDrawer();
  } else if (mobileView) {
    classToUse = classes.mobileDrawer;
  }

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

        <MenuLink onClick={props.closeDrawer} to="/">Home</MenuLink>
        <MenuLink onClick={props.closeDrawer} to="/about">About</MenuLink>
        <MenuLink onClick={props.closeDrawer} to="/careers">Careers</MenuLink>
        {VisitorMenu(props.closeDrawer)}
      </div>
    </Drawer>
  );
}

export default ProAssistDrawer;