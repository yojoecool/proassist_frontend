import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography, 
  } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { toast, useWindowDimensions } from '../../modules/';


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

function JobSeeker() {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const desktopView = width > 768;

    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        password: '',
        passwordCheck: '',
        email: ''
    });

    const handleChange = (name, event) => {
        if (name === 'phoneNumber') {
            console.log(name)
            console.log(event.target.value)
        }
        setState({
        ...state,
        [name]: event.target.value,
        });
    };

    return (
        <div className={classes.root}>
            <Typography variant="h5">Job Seeker Application:</Typography>
            <TextField
                required
                label="First Name"
                id="firstName"
                className={classes.formField}
                value={state.firstName}
                onChange={(e) => handleChange('firstName', e)}
                margin="normal"
            />
            <TextField
                required
                label="Last Name"
                id="lastName"
                className={classes.formField}
                value={state.lastName}
                onChange={(e) => handleChange('lastName', e)}
                margin="normal"
            />
            <TextField
                required
                label="Email"
                id="email"
                className={classes.formField}
                value={state.email}
                onChange={(e) => handleChange('email', e)}
                margin="normal"
            />
            <TextField
                required
                label="Password"
                id="password"
                className={classes.formField}
                value={state.password}
                onChange={(e) => handleChange('password', e)}
                margin="normal"
                type="password"
            />
            <TextField
                required
                label="Confirm Password"
                id="passwordCheck"
                className={classes.formField}
                value={state.passwordCheck}
                onChange={(e) => handleChange('passwordCheck', e)}
                margin="normal"
                type="password"
            />

            {/* <Button size="large" variant="contained" color="primary" className={classes.button}>
                Login with Facebook
            </Button> */}

            <div> 
                <Button size="large" variant="contained" component={Link} to="/register" className={classes.button} >
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
