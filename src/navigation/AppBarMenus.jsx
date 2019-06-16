import React from 'react';
import { MenuItem } from '@material-ui/core';
import { Link } from "react-router-dom";
import { logout } from '../modules';

export const VisitorMenu = (closeMenu) => ([
  (
    <MenuItem
      onClick={closeMenu}
      component={Link}
      to="/login"
      key="login"
    >
      Log In
    </MenuItem>
  ),
  (
    <MenuItem
      onClick={closeMenu}
      component={Link}
      to="/register"
      key="register"
    >
      Register
    </MenuItem>
  )
]);

export const JSMenu = (closeMenu) => ([
  (
    <MenuItem onClick={closeMenu} component={Link} to="/profile" key="profile">
      Profile
    </MenuItem>
  ),
  (
    <MenuItem onClick={() => { logout(); closeMenu(); }} key="logout">
      Logout
    </MenuItem>
  )
]);
