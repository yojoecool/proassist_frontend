import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Route, Switch, withRouter } from 'react-router-dom';
import { JobSeeker, Company, PickIdentity } from './registration';
import { useWindowDimensions } from '../modules';
import classNames from 'classnames';

// TODO: fix routing so if you are on job seeker or company registration, back button will go back to PickIdentity
// Nest Switch
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        paddingBottom: 35,
        marginTop: '10%',
        marginBottom: '3%',
    },
    registrationText: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    }
  }));



// If user is already logged in, reroute to profile page?
function Register() {
    const classes = useStyles();
    
    const { width } = useWindowDimensions();
    const desktopView = width > 768;

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.registrationText}>Registration</Typography>
            <Switch>
                <Route exact path="/register" component={PickIdentity} />
                <Route path="/register/jobseeker" component={JobSeeker} />
                <Route path="/register/company" component={Company} />
            </Switch>
        </div>
    );
}

export default withRouter(Register);
