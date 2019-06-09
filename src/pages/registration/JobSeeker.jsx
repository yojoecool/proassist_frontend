import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography, 
  } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 25,
        flexDirection: 'column'
    },
    formField: {
        width: 400,
    },
    button: {
        width: 150,
        margin: 25,
    },
  }));

function JobSeeker(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5">Job Seeker Application:</Typography>
            <TextField
                required
                label="First Name"
                id="firstName"
                className={classes.formField}
                value={props.firstName}
                onChange={(e) => props.handleChange('firstName', e)}
                margin="normal"
            />
            <TextField
                required
                label="Last Name"
                id="lastName"
                className={classes.formField}
                value={props.lastName}
                onChange={(e) => props.handleChange('lastName', e)}
                margin="normal"
            />
            <TextField
                required
                label="Email"
                id="email"
                className={classes.formField}
                value={props.email}
                onChange={(e) => props.handleChange('email', e)}
                margin="normal"
            />
            <TextField
                required
                label="Password"
                id="password"
                className={classes.formField}
                value={props.password}
                onChange={(e) => props.handleChange('password', e)}
                margin="normal"
                type="password"
            />
            <TextField
                required
                label="Confirm Password"
                id="passwordCheck"
                className={classes.formField}
                value={props.passwordCheck}
                onChange={(e) => props.handleChange('passwordCheck', e)}
                margin="normal"
                type="password"
            />

            {/* <Button size="large" variant="contained" color="primary" className={classes.button}>
                Login with Facebook
            </Button> */}

            <div> 
                <Button size="large" variant="contained" className={classes.button} onClick={props.changeView("back")}>
                    Back
                </Button>

                <Button size="large" variant="contained" color="primary" className={classes.button}>
                    Register
                </Button>
            </div>
        </div>
    )
}

export default JobSeeker;
