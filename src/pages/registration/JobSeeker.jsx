import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography, 
  } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { toast, validations } from '../../modules';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '5%',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')] : {
            marginTop: 25
        }
    },
    formField: {
        width: 450,
        [theme.breakpoints.down('sm')] : {
            width: '80%'
        }
    },
    button: {
        '&:hover': {
            color: theme.palette.blue.light
        },
        width: 150,
        margin: 25,
        [theme.breakpoints.down('sm')] : {
            width: "80%",
            margin: 12
        }
    },
    buttonDiv: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20
    },
    errorText: {
        color: 'red',
        width: '100%',
        textAlign: 'center'
    },
    errorHeight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
  }));

function JobSeeker(props) {
    const classes = useStyles();
    const [errors, setErrors] = React.useState({ errorText: [] });

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
        setState({
        ...state,
        [name]: event.target.value,
        });
    };
    const submit = async (e) => {
        e.preventDefault();
    
        const {validateEmail, validatePassword} = validations;

        const newErrors = {errorText:[]};
        if (state.email && !validateEmail(state.email)) {
            newErrors.email = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Email'];
        }
        if (state.password && !validatePassword(state.password, state.passwordCheck)) {
            newErrors.password = true;
            newErrors.errorText = [...newErrors.errorText, 'Passwords do not match'];
        }

        setErrors(newErrors);
        if (newErrors.errorText.length > 0) {
          toast('Errors on the page.', "error");
          return;
        }
        try {
          const { REACT_APP_BACKEND_URL } = process.env;
          await axios.post(
                `${REACT_APP_BACKEND_URL}/users/register`, 
                { 
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email, 
                    password: state.password,
                    userType: "JobSeeker"
                }
            );
          toast('Registration Successful!', 'success');
          props.history.push('/login');
        } catch (err) {
        if (err.response && err.response.status === 409) {
            toast('User with email already exists.', 'error');
            setErrors({email: true, errorText: []});
          } else {
            toast('Error registering. Please try again later.', 'error');
          }
        }
    };

    const update = (e) => {
        const { [e.target.name]: removed, ...newErrors } = errors;
        setErrors({ ...newErrors, errorText: [] });
    };

    return (
        <div className={classes.root}>
            <Typography variant="h5">Job Seeker Application:</Typography>

            <div className={classes.errorHeight}>
                {errors.errorText.map(err => {
                return (
                    <Typography variant="subtitle1" className={classes.errorText}>
                        {err}
                    </Typography>
                )
                })}
            </div>

            <form className={classes.root} onSubmit={submit}>
            <TextField
                required
                label="First Name"
                name="firstName"
                className={classes.formField}
                value={state.firstName}
                onChange={(e) => {update(e); handleChange('firstName', e)}}
                margin="normal"
                error={errors.firstName}
                autoFocus
            />
            <TextField
                required
                label="Last Name"
                name="lastName"
                className={classes.formField}
                value={state.lastName}
                onChange={(e) => {update(e); handleChange('lastName', e)}}
                margin="normal"
                error={errors.lastName}
            />
            <TextField
                required
                label="Email"
                name="email"
                className={classes.formField}
                value={state.email}
                onChange={(e) => {update(e); handleChange('email', e)}}
                type="email"
                autoComplete="email"
                margin="normal"
                error={errors.email}
            />
            <TextField
                required
                label="Password"
                name="password"
                className={classes.formField}
                value={state.password}
                onChange={(e) => {update(e); handleChange('password', e)}}
                margin="normal"
                type="password"
                error={errors.password}
            />
            <TextField
                required
                label="Confirm Password"
                name="passwordCheck"
                className={classes.formField}
                value={state.passwordCheck}
                onChange={(e) => {update(e); handleChange('passwordCheck', e)}}
                margin="normal"
                type="password"
                error={errors.password}
            />

            <div className={classes.buttonDiv}> 
                <Button size="large" variant="contained" component={Link} to="/register" className={classes.button}>
                    Back
                </Button>

                <Button size="large" variant="contained" color="primary" className={classes.button} type="submit">
                    Register
                </Button>
            </div>
            </form>
        </div>
    )
}

export default withRouter(JobSeeker);
