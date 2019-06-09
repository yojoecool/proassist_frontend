import React from 'react';
import axios from 'axios';
import toast from '../../modules/toast';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Input, TextField, Typography, 
  } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

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
    subsection: {
        marginTop: 35,
    }
  }));

function PhoneNumberFormat(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
        {...other}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
    );
}
PhoneNumberFormat.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


function Company(props) {
    const classes = useStyles();
    const [errors, setErrors] = React.useState({});

    const submit = async (e) => {
        e.preventDefault();
    
        const newErrors = {};
    
        if (!props.companyName) {
            newErrors.companyName = true;
            newErrors.errorText = 'Missing Required Field(s)';
        }
        if (!props.email) {
          newErrors.email = true;
          newErrors.errorText = 'Missing Required Field(s)';
        }
        if (!props.password) {
          newErrors.password = true;
          newErrors.errorText = 'Missing Required Field(s)';
        }
        if (props.password && props.password != props.passwordCheck) {
            newErrors.passwordCheck = true;
            newErrors.errorText = 'Passwords do not match';
        }
        if (!props.firstName) {
            newErrors.firstName = true;
            newErrors.errorText = 'Missing Required Field(s)';
        }
        if (!props.lastName) {
            newErrors.lastName = true;
            newErrors.errorText = 'Missing Required Field(s)';
        }
        if (!props.phoneNumber) {
            newErrors.phoneNumber = true;
            newErrors.errorText = 'Missing Required Field(s)';
        }
    
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
          toast('Errors on the page.', 'error');
          return;
        }
    
        try {
          const { REACT_APP_BACKEND_URL } = process.env;
          const response = await axios.post(
                `${REACT_APP_BACKEND_URL}/users/registration`, 
                { 
                    companyName: props.companyName,
                    email: props.email, 
                    password: props.password,
                    firstName: props.firstName,
                    lastName: props.lastName,
                    phoneNumber: props.phoneNumber
                }
            );
          toast('Registration Successful!', 'success');
          props.history.push('/careers');
        } catch (err) {
          if (err.response.status === 401) {
            toast('Invalid Input', 'error');
          } else {
            toast('Error registering. Please try again later.', 'error');
          }
        }
    };

    const update = (e, changeFunction) => {
        const { [e.target.name]: removed, ...newErrors } = errors;
        setErrors({ ...newErrors, errorText: '' });
        changeFunction(e.target.value);
};
    

    return (
        <div className={classes.root}>
            <Typography variant="h5">Company Application:</Typography>
            <form className={classes.root} onSubmit={submit}>
            <Typography variant="subtitle1" className={classes.subsection}>Company Information:</Typography>
            <TextField
                required
                label="Company Name"
                id="companyName"
                className={classes.formField}
                value={props.companyName}
                onChange={props.handleChange('companyName')}
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
            <Typography variant="subtitle1" className={classes.subsection}>Point of Contact Information:</Typography>
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
                label="Phone Number"
                id="phoneNumber"
                className={classes.formField}
                value={props.phoneNumber}
                onChange={props.handleChange('phoneNumber')}
                margin="normal"
                InputProps={{
                    inputComponent: PhoneNumberFormat,
                }}
            />
            
            <div> 
                <Button size="large" variant="contained" className={classes.button} onClick={props.changeView("back")}>
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

export default Company;
