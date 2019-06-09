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
                onChange={props.handleChange('firstName')}
                margin="normal"
            />
            <TextField
                required
                label="Last Name"
                id="lastName"
                className={classes.formField}
                value={props.lastName}
                onChange={props.handleChange('lastName')}
                margin="normal"
            />
            <TextField
                required
                label="Email"
                id="email"
                className={classes.formField}
                value={props.email}
                onChange={props.handleChange('email')}
                margin="normal"
            />
            <TextField
                required
                label="Password"
                id="password"
                className={classes.formField}
                value={props.password}
                onChange={props.handleChange('password')}
                margin="normal"
                type="password"
            />
            <TextField
                required
                label="Confirm Password"
                id="passwordCheck"
                className={classes.formField}
                value={props.passwordCheck}
                onChange={props.handleChange('passwordCheck')}
                margin="normal"
                type="password"
            />

            {/* <Button size="large" variant="contained" color="primary" className={classes.button}>
                Login with Facebook
            </Button> */}

            <div> 
                <Button size="large" variant="contained" color="primary-light" className={classes.button} onClick={props.changeView("back")}>
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
