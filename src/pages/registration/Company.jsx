import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Typography, 
  } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import {validateEmail, validatePhoneNumber, validatePassword} from './validations';
import { toast } from '../../modules';
import { useWindowDimensions } from '../../hooks'

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
    
    const { width } = useWindowDimensions();
    const desktopView = width > 768;

    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordCheck: '',
        pocEmail: ''
    });

    const handleChange = (name, event) => {
        setState({
        ...state,
        [name]: event.target.value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
    
        const newErrors = {errorText:[]};
        if (state.email && !validateEmail(state.email)) {
            newErrors.email = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Company Email'];
        }
        if (state.pocEmail && !validateEmail(state.pocEmail)) {
            newErrors.pocEmail = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Email'];
        }
        if (state.password && !validatePassword(state.password, state.passwordCheck)) {
            newErrors.password = true;
            newErrors.errorText = [...newErrors.errorText, 'Passwords do not match'];
        }
        if (state.phoneNumber && !validatePhoneNumber(state.phoneNumber)) {
            newErrors.phoneNumber = true;
            newErrors.errorText = [...newErrors.errorText, 'Invalid Phone Number'];
        }
    
        setErrors(newErrors);
        if (newErrors.errorText.length > 0) {
          toast('Errors on the page.', "error");
          return;
        }
        try {
          const { REACT_APP_BACKEND_URL } = process.env;
          console.log(`${REACT_APP_BACKEND_URL}`)
          const response = await axios.post(
                `${REACT_APP_BACKEND_URL}/users/register`, 
                { 
                    companyName: state.companyName,
                    email: state.email, 
                    password: state.password,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    pocEmail: state.pocEmail,
                    phoneNumber: state.phoneNumber,
                    userType: "Company"
                }
            );
          toast('Registration Successful!', 'success');
          props.history.push('/login');
        } catch (err) {
          if (err.response.status === 409) {
            toast('Company with Email Already Exists', 'error');
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
                value={state.companyName}
                onChange={(e) => {update(e); handleChange('companyName', e)}}
                margin="normal"
                error={errors.companyName}
            />
            <TextField
                required
                label="Company Email"
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
            <Typography variant="subtitle1" className={classes.subsection}>Point of Contact Information:</Typography>
            <TextField
                required
                label="First Name"
                name="firstName"
                className={classes.formField}
                value={state.firstName}
                onChange={(e) => {update(e); handleChange('firstName', e)}}
                margin="normal"
                error={errors.firstName}
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
                name="pocEmail"
                className={classes.formField}
                value={state.pocEmail}
                onChange={(e) => {update(e); handleChange('pocEmail', e)}}
                type="email"
                autoComplete="email"
                margin="normal"
                error={errors.pocEmail}
            />
            <TextField
                required
                label="Phone Number"
                name="phoneNumber"
                className={classes.formField}
                value={state.phoneNumber}
                onChange={(e) => {update(e); handleChange('phoneNumber', e)}}
                margin="normal"
                InputProps={{
                    inputComponent: PhoneNumberFormat,
                }}
                error={errors.phoneNumber}
            />
            
            <div> 
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

export default withRouter(Company);
