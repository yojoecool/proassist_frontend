import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Menu
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import VisitorMenu from './VisitorMenu';
import useWindowDimensions from './modules/useWindowDimensions';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  menuItem: {
    '&:hover': {
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    marginRight: 10
  },
  linkItems: {
    '&:hover': {
      color: 'inherit'
    },
    color: 'inherit'
  }
}));

function ProAssistAppBar(props) {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

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

        <Typography
          variant="subtitle1"
          hidden={mobileView}
          className={classes.menuItem}
        >
          <Link to="/test" className={classes.linkItems}>Test</Link>
        </Typography>
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

export default ProAssistAppBar;
