import React from 'react';
import { MenuItem } from '@material-ui/core';

const VisitorMenu = (closeMenu) => ([
  <MenuItem onClick={closeMenu} key="login">Log In</MenuItem>,
  <MenuItem onClick={closeMenu} key="register">Register</MenuItem>
]);

export default VisitorMenu;
