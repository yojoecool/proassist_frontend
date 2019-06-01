import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
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
  }
}));

const VisitorMenu = (props) => {
  return (
    <React.Fragment>
      <MenuItem onClick={props.closeMenu}>Log In</MenuItem>
      <MenuItem onClick={props.closeMenu}>Regsiter</MenuItem>
    </React.Fragment>
  );
}

function ProAssistAppBar() {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const mobileView = width <= 768;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          ProAssist
        </Typography>

        <Typography
          variant="subtitle1"
          hidden={mobileView}
          className={classes.menuItem}
        >
          Test
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
          <VisitorMenu closeMenu={closeMenu} />
        </Menu>

        <IconButton
          color="inherit"
          hidden={!mobileView}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ProAssistAppBar;
