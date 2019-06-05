import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Tabs, Tab, Drawer, Button, IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
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
  drawer: {
    width: "75%",
    display: "flex"
  },
  tabsDesktop: {
    [theme.breakpoints.down('sm')]:{
      display: "none",
    }
  },
  tabsDrawer: {
    display: "flex",
    flexDirection: "column", 
  },
  hamburger: {
    [theme.breakpoints.up('md')]:{
      display: "none",
    }
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

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  // const sideList = side => (
  //   <div
  //     className={classes.list}
  //     role="presentation"
  //     onClick={toggleDrawer(side, false)}
  //     onKeyDown={toggleDrawer(side, false)}
  //   >
  //     <IconButton onClick={toggleDrawer(side, false)}><ClearIcon/></IconButton>
  //     {/* <List>
  //       {['Main', 'About', 'Careers'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['Login', 'Register'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List> */}
  //     <Tabs value={value} onChange={handleChange}>
  //       <NavLinkTab label="Main" to="/" />
  //       <NavLinkTab label="About" to="/about" />
  //       <NavLinkTab label="Careers" to="/careers" />
  //       <NavLinkTab label="Login/Register" to="/login" />
  //     </Tabs>
  //   </div>
  // );


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          ProAssist
        </Typography>
          <Tabs className={classes.tabsDesktop} value={value} onChange={handleChange}>
            <NavLinkTab label="Main" to="/" />
            <NavLinkTab label="About" to="/about" />
            <NavLinkTab label="Careers" to="/careers" />
            <NavLinkTab label="Login/Register" to="/login" />
          </Tabs>
          <Button className={classes.hamburger} onClick={toggleDrawer('right', true)}><MenuIcon /></Button>
          <Drawer className={classes.drawer} anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
            <div
              onClick={toggleDrawer('right', false)}
              onKeyDown={toggleDrawer('right', false)}
            >
              <IconButton onClick={toggleDrawer('right', false)}><ClearIcon/></IconButton>
              <Tabs className="tabsDrawer" value={value} onChange={handleChange}>
                <NavLinkTab label="Main" to="/" />
                <NavLinkTab label="About" to="/about" />
                <NavLinkTab label="Careers" to="/careers" />
                <NavLinkTab label="Login/Register" to="/login" />
              </Tabs>
            </div>
          </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default ProAssistAppBar;
