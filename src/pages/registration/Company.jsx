import React from 'react';
import axios from 'axios';
import toast from '../../modules/toast';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography, 
  } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import {validateEmail, validatePhoneNumber, validatePassword} from './validations';

// TODO: should return error if email already exists in DB

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
    const [errors, setErrors] = React.useState({ errorText: [] });

    const submit = async (e) => {
        e.preventDefault();
    
        const newErrors = {errorText:[]};
        if (props.email && !validateEmail(props.email)) {
            newErrors.email = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Email'];
        }
        if (props.password && !validatePassword(props.password, props.passwordCheck)) {
            newErrors.password = true;
            newErrors.errorText = [...newErrors.errorText, 'Passwords do not match'];
        }
        if (props.phoneNumber && !validatePhoneNumber(props.phoneNumber)) {
            newErrors.phoneNumber = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Phone Number'];
        }
    
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
          toast('Errors on the page.', "error");
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

    const update = (e) => {
        const { [e.target.name]: removed, ...newErrors } = errors;
        setErrors({ ...newErrors, errorText: [] });
};
    

    return (
        <div className={classes.root}>
            <Typography variant="h5">Company Application:</Typography>

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
                label="Company Name"
                name="companyName"
                className={classes.formField}
                value={props.companyName}
                onChange={(e) => {update(e); props.handleChange('companyName', e)}}
                margin="normal"
                error={errors.companyName}
            />
            <TextField
                required
                label="Email"
                name="email"
                className={classes.formField}
                value={props.email}
                onChange={(e) => {update(e); props.handleChange('email', e)}}
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
                value={props.password}
                onChange={(e) => {update(e); props.handleChange('password', e)}}
                margin="normal"
                type="password"
                error={errors.password}
            />
            <TextField
                required
                label="Confirm Password"
                name="passwordCheck"
                className={classes.formField}
                value={props.passwordCheck}
                onChange={(e) => {update(e); props.handleChange('passwordCheck', e)}}
                margin="normal"
                type="password"
                error={errors.password}
            />
            <Typography variant="subtitle1" className={classes.subsection}>Point of Contact Information:</Typography>
            <TextField
                required
                label="First Name"
                name="firstName"
                className={classes.formField}
                value={props.firstName}
                onChange={(e) => {update(e); props.handleChange('firstName', e)}}
                margin="normal"
                error={errors.firstName}
            />
            <TextField
                required
                label="Last Name"
                name="lastName"
                className={classes.formField}
                value={props.lastName}
                onChange={(e) => {update(e); props.handleChange('lastName', e)}}
                margin="normal"
                error={errors.lastName}
            />
            <TextField
                required
                label="Phone Number"
                name="phoneNumber"
                className={classes.formField}
                value={props.phoneNumber}
                onChange={(e) => {update(e); props.handleChange('phoneNumber', e)}}
                margin="normal"
                InputProps={{
                    inputComponent: PhoneNumberFormat,
                }}
                error={errors.phoneNumber}
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
