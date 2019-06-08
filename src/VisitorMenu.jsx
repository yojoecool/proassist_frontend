import React from 'react';
import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  linkItems: {
    '&:hover': {
      color: 'inherit'
    },
    color: 'inherit'
  }
}));

const VisitorMenu = (closeMenu) => ([
  (<Link to="/login" className={useStyles().linkItems} key="login">
    <MenuItem onClick={closeMenu}>
      Log In
    </MenuItem>
  </Link>),
  (<Link to="/register" className={useStyles().linkItems} key="register">
    <MenuItem onClick={closeMenu}>
      Register
    </MenuItem>
  </Link>),
]);

export default VisitorMenu;
