import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Tabs, Tab
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavLinkTab(props) {
  return (
    <Tab
      component={NavLink}
      {...props}
      />
  );
}

function ProAssistAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          ProAssist
        </Typography>
          <Tabs value={value} onChange={handleChange}>
            <NavLinkTab label="Main" to="/" />
            <NavLinkTab label="About" to="/about" />
            <NavLinkTab label="Careers" to="/careers" />
            <NavLinkTab label="Login/Register" to="/login" />
          </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default ProAssistAppBar;
